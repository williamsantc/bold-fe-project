import { FC, forwardRef, HTMLProps, LegacyRef, ReactNode } from "react";
import styles from "./Card.module.scss";
import { clsx } from "clsx";

type CardProps = {
    children: ReactNode;
    ref?: LegacyRef<HTMLDivElement>;
} & Omit<HTMLProps<HTMLDivElement>, "ref">;

const CardBase: FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={clsx(styles.card, className)} ref={ref as LegacyRef<HTMLDivElement>} {...rest}>
        {children}
      </div>
    );
  }
);

CardBase.displayName = "CardBase";

const CardHeader: FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...rest }, ref) => {
  return (
    <div className={clsx(styles.cardHeader, className)} ref={ref as LegacyRef<HTMLDivElement>} {...rest}>
      {children}
    </div>
  );
});
CardHeader.displayName = "CardHeader";

const CardBody: FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...rest }, ref) => {
  return (
    <div className={clsx(styles.cardBody, className)} ref={ref as LegacyRef<HTMLDivElement>} {...rest}>
      {children}
    </div>
  );
});
CardBody.displayName = "CardBody";

const Card = CardBase as FC<CardProps> & { Header: FC<CardProps>; Body: FC<CardProps> };
Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
