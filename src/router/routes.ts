export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MAIN: '/main',
  INFO: '/info',
  ADMIN: '/admin',
  RESET_PASSWORD: '/reset-password',
  ADMIN_COUPONS: `/admin/coupons`,
  ADMIN_COUPON_DETAIL: `/admin/coupons/:id`,
  ADMIN_COUPON_CREATE: `/admin/coupons/create`,
  ADMIN_COUPON_EDIT: `/admin/coupons/edit/:id`,
  ADMIN_PRODUCTS: `/admin/products`,
  ADMIN_PRODUCT_DETAIL: `/admin/products/:id`,
  ADMIN_PRODUCTS_CREATE: `/admin/products/create`,
  ADMIN_PRODUCTS_EDIT: `/admin/products/edit/:id`,
  ADMIN_USERS: `/admin/users`,
  ADMIN_USERS_EDIT: `/admin/users/edit/:id`,
  SUBSCRIPTION: '/subscription',
  CHECKOUT: '/checkout', // 결제 진행 페이지 (카드 정보 입력 등)
  PAYMENT_SUCCESS: '/payment/success', // 결제 성공 페이지
  PAYMENT_FAILED: '/payment/failed', // 결제 실패 페이지
  BILLING: '/billing', // 결제 내역 확인 페이지
  TERMS: '/terms', // 이용약관 페이지
  PRIVACY_POLICY: '/privacy-policy', // 개인정보처리방침 페이지
  USER_GUIDE: '/user-guide', // 사용방법 페이지
  COUPON: '/coupon', // 쿠폰 등록 페이지
  NOT_FOUND: '*',
};
