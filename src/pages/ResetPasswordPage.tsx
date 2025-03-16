import { useResetPassword } from '@/hooks/mutation/user/useResetPassword';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') as string;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useResetPassword();

  const isValidPassword = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setError('');
    const errors: string[] = [];

    if (!token) {
      setError('유효하지 않은 요청입니다.');
      return;
    }

    if (password !== confirmPassword) {
      errors.push('비밀번호가 일치하지 않습니다.');
    }

    if (!isValidPassword(password)) {
      errors.push(
        '비밀번호는 최소 8자 이상이어야 하며, 숫자와 특수 문자를 포함해야 합니다.'
      );
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    try {
      const result = await resetPassword({ code: token, password });

      console.log(result);

      if (result?.ok) {
        setSuccess(true);
      } else {
        setError(result?.error || '비밀번호 재설정에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-indigo-700">인터뷰 앱</h1>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          비밀번호 재설정
        </h2>
        {!success && (
          <div>
            <p className="text-gray-600 text-center mt-2">
              새 비밀번호를 입력해주세요.
            </p>
            <p className="text-gray-600 text-center mt-2 text-sm">
              비밀번호는 최소 8자 이상이어야 하며, 숫자와 특수 문자를 포함해야
              합니다.
            </p>
          </div>
        )}

        {success ? (
          <div className="text-center text-green-600 font-semibold mt-4">
            비밀번호가 성공적으로 변경되었습니다!
          </div>
        ) : (
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">
                새 비밀번호
              </label>
              <input
                type="password"
                autoComplete="new-password"
                className="w-full p-2 mt-2 border rounded-lg focus:ring focus:ring-indigo-300"
                placeholder="새 비밀번호 입력"
                maxLength={64}
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">
                비밀번호 확인
              </label>
              <input
                type="password"
                autoComplete="new-password"
                className="w-full p-2 mt-2 border rounded-lg focus:ring focus:ring-indigo-300"
                placeholder="비밀번호 확인"
                maxLength={64}
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 mt-4 rounded-lg hover:bg-indigo-700 transition"
            >
              비밀번호 재설정
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
