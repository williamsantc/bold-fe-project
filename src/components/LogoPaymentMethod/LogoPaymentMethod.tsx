import { PaymentMethod } from "@/lib/constants/PaymentMethod";
import { Franchise } from "@/lib/constants/Franchise";
import LogoFranchise from "@/components/LogoFranchise";

type LogoPaymentMethodProps = {
    paymentMethod: PaymentMethod;
    franchise?: Franchise;
}


const LogoPaymentMethod = ({ paymentMethod, franchise }: LogoPaymentMethodProps) => {
  switch (paymentMethod) {
  case PaymentMethod.NEQUI:
    return (
      <img src="/nequi.svg" alt="NEQUI" width={24} height={24} />
    );
  case PaymentMethod.BANCOLOMBIA:
    return (
      <img src="/bancolombia.png" alt="BANCOLOMBIA" width={24} height={24} />
    );
  case PaymentMethod.DAVIPLATA:
    return (
      <img src="/daviplata.png" alt="DAVIPLATA" width={24} height={24} />
    );
  case PaymentMethod.CARD:
    if(!franchise) {
      console.warn('Franchise is required for CARD payment method');
      return null;
    }
    return (
      <LogoFranchise franchise={franchise} />
    );
  case PaymentMethod.PSE:
    return (
      <img src="/pse.jpg" alt="PSE" width={24} height={24} />
    );
  default:
    return null;
  }
};

export default LogoPaymentMethod;
