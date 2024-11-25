import { PaymentMethod } from "@/lib/constants/PaymentMethod";
import { SalesType } from "@/lib/constants/SalesType";
import { Status } from "@/lib/constants/Status";

export type Dashboard = {
    id: string;
    status: Status;
    paymentMethod: PaymentMethod;
    salesType: SalesType;
    createdAt: number;
    amount: number;
    deduction?: number;
    franchise?: string;
}
