import { useSignUp } from "@/hooks/useSignUp";
import { ROUTES } from "@/router/routes";
import { cls } from "@/utils";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const {
    kind,
    handleContinueClick,
    handleChange,
    formData,
    errors,
    loading,
    accountLoading,
    handleSubmit,
    createAccountError,
    handleShowPassword,
    showPassword,
    handleKindReset,
  } = useSignUp();

  if (kind) {
    return (
      <div>
        <div className="absolute top-4 left-4">
          <button
            type="button"
            onClick={handleKindReset}
            className="text-xs bg-white text-black py-2 px-6 rounded-lg shadow transition duration-200 ease-in-out hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-black/50 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {t("login.backToEmail")} {/* 번역된 버튼 텍스트 사용 */}
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-blue-600"
        >
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-lg mb-6 text-center text-gray-800">
              {kind === "sign" ? t("login.signup") : t("login.login")}{" "}
              {/* 번역된 타이틀 사용 */}
            </h2>
            <h2 className="mb-6 text-center text-gray-800 mt-8">
              {kind === "sign"
                ? t("login.setPassword")
                : t("login.enterPassword")}
            </h2>
            <div className="relative">
              <input
                id="password"
                name="password"
                placeholder={t("login.passwordPlaceholder")} // 번역된 플레이스홀더 사용
                type={showPassword ? "text" : "password"}
                autoComplete={
                  kind === "sign" ? "new-password" : "current-password"
                }
                minLength={8}
                maxLength={64}
                autoFocus
                required
                onChange={handleChange}
                value={formData.password}
                className={cls(
                  "border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200",
                )}
              />
              <button
                type="button"
                className="absolute text-xs md:text-sm inset-y-0 right-0 pr-3 flex items-center"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {kind === "sign" && (
              <p className="mt-2 text-xs md:text-sm">
                {t("login.passwordHint")} {/* 번역된 힌트 텍스트 사용 */}
              </p>
            )}
            {errors.password && (
              <p className="mt-2 text-xs md:text-sm text-red-600">
                {errors.password}
              </p>
            )}
            {createAccountError && (
              <p className="mt-2 text-xs md:text-sm text-red-600">
                {createAccountError}
              </p>
            )}
            <button
              id="button"
              disabled={accountLoading}
              className="w-full bg-blue-600 text-white p-3 mt-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {kind === "sign" ? t("login.signup") : t("login.login")}{" "}
              {/* 번역된 버튼 텍스트 사용 */}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-blue-600">
      <div className="absolute top-4 left-4">
        <Link
          to={ROUTES.HOME}
          className="text-xs bg-white text-black py-2 px-6 rounded-lg shadow transition duration-200 ease-in-out hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-black/50 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t("login.backToHome")} {/* 번역된 버튼 텍스트 사용 */}
        </Link>
      </div>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-lg mb-6 text-center text-gray-800">
          {t("header.title")}
        </h2>
        <h2 className="mb-6 text-center text-gray-800 mt-8">
          {t("login.enterEmail")} {/* 번역된 이메일 입력 안내 텍스트 사용 */}
        </h2>
        <form onSubmit={handleContinueClick}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("login.emailPlaceholder")} // 번역된 이메일 플레이스홀더 사용
            required
            autoFocus
            onChange={handleChange}
            value={formData.email}
            className={cls(
              errors.email.length === 0 ? "mb-4" : "",
              "border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200",
            )}
          />
          {errors.email && (
            <p className="mt-2 text-xs md:text-sm text-red-600">
              {errors.email}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 mt-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? t("login.loading") : t("login.continue")}{" "}
            {/* 번역된 버튼 텍스트 사용 */}
          </button>
        </form>
      </div>
    </div>
  );
}
