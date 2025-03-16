import DeleteAccountModal from '@/components/modal/DeleteAccountModal';
import { useDeleteAccount } from '@/hooks/mutation/user/useDeleteAccount';
import { useMyProfile } from '@/hooks/query/useMyProfile';
import useOpen from '@/hooks/useOpen';
import { useTranslation } from 'react-i18next';

export default function UserDashboardDeleteAccountFetcher() {
  const { user } = useMyProfile();
  const { handleDeleteAccount } = useDeleteAccount();
  const { isOpen, close, open } = useOpen();
  const { t } = useTranslation(); // useTranslation 훅 사용

  const handleDelete = async () => {
    await handleDeleteAccount({ userId: user.id });
    close();
  };

  return (
    <>
      <div className="mt-8 text-center">
        <button
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
          onClick={open}
        >
          {t('userDashboard.deleteAccountButton')}
        </button>
      </div>

      {/* 회원탈퇴 확인 모달 */}
      <DeleteAccountModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={handleDelete}
      />
    </>
  );
}
