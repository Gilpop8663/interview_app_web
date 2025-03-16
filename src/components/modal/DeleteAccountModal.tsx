import React, { useRef } from "react";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { t } = useTranslation(); // useTranslation 훅 사용

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg shadow-lg p-6 w-96"
      onClose={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <h2 className="text-lg font-semibold mb-4">
        {t("deleteAccountModal.title")}
      </h2>
      <p className="mb-6">{t("deleteAccountModal.message")}</p>
      <div className="flex justify-end">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {t("deleteAccountModal.confirmButton")}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
        >
          {t("deleteAccountModal.cancelButton")}
        </button>
      </div>
    </dialog>
  );
};

export default DeleteAccountModal;
