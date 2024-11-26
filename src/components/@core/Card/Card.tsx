import { FC, forwardRef, HTMLProps, LegacyRef, ReactNode } from "react";
import styles from "./Card.module.scss";
import { clsx } from "clsx";

type CardProps = {
    children: ReactNode;
} & Omit<HTMLProps<HTMLDivElement>, 'ref'>;

const Card: FC<CardProps> & { Header: FC<CardProps>; Body: FC<CardProps> } = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...rest }, ref) => {
    return (
        <div className={clsx(styles.card, className)} ref={ref as LegacyRef<HTMLDivElement>} {...rest}>
            {children}
        </div>
    );
}) as unknown as FC<CardProps> & { Header: FC<CardProps>; Body: FC<CardProps> };

const CardHeader: FC<CardProps> = forwardRef(({ children, className, ...rest }, ref) => {
    return (
        <div className={clsx(styles.cardHeader, className)} ref={ref as LegacyRef<HTMLDivElement>} {...rest}>
            {children}
        </div>
    );
});

const CardBody: FC<CardProps> = forwardRef(({ children, className, ...rest }, ref) => {
    return (
        <div className={clsx(styles.cardBody, className)} ref={ref as LegacyRef<HTMLDivElement>} {...rest}>
            {children}
        </div>
    );
});

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
