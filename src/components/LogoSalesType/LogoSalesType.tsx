import { SalesType } from "@/lib/constants/SalesType";
import { FC } from "react";
import Image from "next/image";

type LogoSalesTypeProps = {
    salesType: SalesType;
}

const LogoSalesType: FC<LogoSalesTypeProps> = ({ salesType }) => {
    switch (salesType) {
        case SalesType.PAYMENT_LINK:
            return (
                <Image
                    src="/link.webp"
                    alt="PAYMENT LINK"
                    width={16}
                    height={16}
                    priority
                />
            );
        case SalesType.TERMINAL:
            return (
                <Image
                    src="/pos.svg"
                    alt="TERMINAL"
                    width={24}
                    height={24}
                    priority
                />
            );
        default:
            return null;
    }
}

export default LogoSalesType;
