import { forwardRef, ChangeEvent, HTMLProps } from "react";
import { clsx } from "clsx";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    value: string;
    label: string;
} & Omit<HTMLProps<HTMLInputElement>, "onChange" | "checked" | "value" | "ref">;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ onChange, checked, value, label, className, ...props }, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onChange({
          target: { value, checked: !checked } as unknown as ChangeEvent<HTMLInputElement>,
        } as unknown as ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <label className={clsx(styles.checkboxWrapper, className)}>
        <input
          ref={ref}
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          {...props}
        />
        {label}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
