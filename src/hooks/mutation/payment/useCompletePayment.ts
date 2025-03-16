import { COMPLETE_PAYMENT } from "@/gql/mutation/payment";
import { showPromiseToast } from "@/lib/toast";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

interface Props {
  orderId: number;
  paymentId: number;
  transactionId: string;
}

interface Result {
  completePayment: {
    ok: boolean;
    error: null | string;
  };
}

export const useCompletePayment = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [completePayment] = useMutation<Result>(COMPLETE_PAYMENT);

  const handleCompletePayment = async (input: Props) => {
    const result = completePayment({
      variables: {
        input,
      },
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.completePayment.ok) {
          throw new Error(
            res.data?.completePayment.error || t("payment.errorToast"),
          );
        }

        return res;
      }),
      {
        success: t("payment.successToast"),
        error: t("payment.errorToast"),
        pending: t("payment.pendingToast"),
      },
    );

    return result;
  };

  return { handleCompletePayment };
};
