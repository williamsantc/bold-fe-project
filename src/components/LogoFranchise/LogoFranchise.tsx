import { FC } from "react";
import Image from "next/image";
import { Franchise } from "@/lib/constants/Franchise";

type FranchiseLogoProps = {
    franchise: Franchise;
};

const LogoFranchise: FC<FranchiseLogoProps> = ({ franchise }) => {
    switch (franchise) {
        case Franchise.VISA:
            return (
                <Image
                    src="/visa.png"
                    alt="VISA"
                    width={24}
                    height={24}
                    priority
                />
            );
        case Franchise.MASTERCARD:
            return (
                <Image
                    src="/mastercard.jpg"
                    alt="MASTERCARD"
                    width={24}
                    height={24}
                    priority
                />
            );
        default:
            return null;
    }
};

export default LogoFranchise;
