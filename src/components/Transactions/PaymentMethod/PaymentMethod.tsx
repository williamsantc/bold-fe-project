import { FC, useMemo } from "react";
import { PaymentMethod as PaymentMethodEnum } from "@/lib/constants/PaymentMethod";
import { Franchise } from "@/lib/constants/Franchise";
import LogoPaymentMethod from "@/components/LogoPaymentMethod";

type PaymentMethodProps = {
    paymentMethod: PaymentMethodEnum;
    franchise?: Franchise;
    transactionReference?: number;
}


const PaymentMethod: FC<PaymentMethodProps> = ({ paymentMethod, transactionReference, franchise }) => {
  const paymentMethodLabel = useMemo(() => paymentMethod === PaymentMethodEnum.CARD ? `**** ${transactionReference}`: paymentMethod, [paymentMethod, franchise, transactionReference]);

  return (
    <>
      <LogoPaymentMethod paymentMethod={paymentMethod} franchise={franchise} />
            &nbsp;
      <span>{paymentMethodLabel}</span>
    </>
  );
};

export default PaymentMethod;
