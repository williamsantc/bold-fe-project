import { forwardRef, ChangeEvent, HTMLProps, useState, useEffect } from "react";
import { clsx } from "clsx";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    value: string;
    label: string;
} & Omit<HTMLProps<HTMLInputElement>, "onChange" | "checked" | "value" | "ref">;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ onChange, checked, value, label, className, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState<boolean>(!!checked);

    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setInternalChecked(e.target.checked);
      }
      onChange(e);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const newChecked = !internalChecked;
        if (checked === undefined) {
          setInternalChecked(newChecked);
        }
        onChange({
          target: { value, checked: newChecked } as unknown as ChangeEvent<HTMLInputElement>,
        } as unknown as ChangeEvent<HTMLInputElement>);
      }
    };

    const checkboxId = `checkbox-${value}`;

    return (
      <div className={clsx(styles.checkboxWrapper, className)}>
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          value={value}
          checked={internalChecked}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          aria-checked={internalChecked}
          className={styles.checkboxInput}
          {...props}
        />
        <label htmlFor={checkboxId} className={styles.checkboxLabel}>
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
