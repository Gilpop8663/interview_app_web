import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import './index.css';
import { ACCESS_TOKEN } from './constants/localstorage.ts';
import PortalToastContainer from './components/Toast/PortalToastContainer.tsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.tsx';
import './i18n';

const fetchUrl = process.env.VITE_DB_URL || 'http://localhost:3000/graphql';

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        // 로그인 페이지로 리다이렉트
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = '/login';
        return; // 더 이상 요청을 재시도하지 않음
      }
    }
  }
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: fetchUrl,
  credentials: 'include',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // 액세스 토큰 설정
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: 'include',
});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <RouterProvider router={router} />
      <PortalToastContainer />
    </StrictMode>
  </ApolloProvider>
);
