import { ChangeEvent, FormEvent, useState } from 'react';
import { useCreateAccount } from './mutation/user/useCreateAccount';
import { ACCESS_TOKEN } from '@/constants/localstorage';
import { useCheckEmail } from './mutation/user/useCheckEmail';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/routes';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

// 커스텀 훅 정의
export const useSignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [kind, setKind] = useState<'login' | 'sign' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { handleCheckEmail, loading } = useCheckEmail();
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });

  // 이메일 인증 성공 여부를 관리하는 상태 변수
  const [createAccountError, setCreateAccountError] = useState(''); // 오류 메시지 상태
  const {
    handleCreateAccount,
    prefetchMyProfile,
    loading: accountLoading,
  } = useCreateAccount();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleKindReset = () => {
    setKind(null);
    setErrors({
      email: '',
      password: '',
    });
    setFormData({
      email: '',
      password: '',
    });
    setCreateAccountError('');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: '',
      password: '',
    };

    if (!formData.email) newErrors.email = '이메일을 입력해주세요.';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';

    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.';
    else if (formData.password.length < 8)
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await handleCreateAccount({
        email: formData.email,
        password: formData.password,
      });

      if (!result.data?.createAccount.ok) {
        setCreateAccountError(
          result.data?.createAccount.error || '계정 생성에 실패했습니다.'
        );

        return;
      }

      const { token } = result.data.createAccount;

      localStorage.setItem(ACCESS_TOKEN, token ?? '');
      await prefetchMyProfile();
      setCreateAccountError('');
      navigate(ROUTES.MAIN);
    }
  };

  const handleContinueClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      email: '',
      password: '',
    };

    if (!formData.email) newErrors.email = '이메일을 입력해주세요.';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';

    if (newErrors.email) {
      setErrors(newErrors);
      return;
    }

    const result = await handleCheckEmail({ email: formData.email });

    setKind(result.data?.checkEmail.ok ? 'sign' : 'login');
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    errors,
    formData,
    showPassword,
    handleChange,
    handleSubmit,
    handleShowPassword,
    createAccountError,
    kind,
    handleContinueClick,
    loading,
    accountLoading,
    setKind,
    handleKindReset,
  };
};
