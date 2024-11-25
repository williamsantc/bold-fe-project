import { PaymentMethod } from "@/lib/constants/PaymentMethod";
import { SalesType } from "@/lib/constants/SalesType";
import { Status } from "@/lib/constants/Status";
import { Franchise } from "@/lib/constants/Franchise";

export type Transaction = {
    id: string;
    status: Status;
    paymentMethod: PaymentMethod;
    salesType: SalesType;
    createdAt: number;
    amount: number;
    deduction?: number;
    franchise?: Franchise; // Only for PaymentMethod.CARD payment method
    transactionReference?: number; // Only for PaymentMethod.CARD payment method
}
