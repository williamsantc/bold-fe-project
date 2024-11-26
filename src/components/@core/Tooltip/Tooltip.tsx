import React, {
  forwardRef,
  HTMLProps,
  LegacyRef,
  ReactNode,
  useState,
  useId,
} from "react";
import styles from "./Tooltip.module.scss";
import clsx from "clsx";

type TooltipProps = {
    text: string;
    children: ReactNode;
    trigger?: "hover" | "click";
} & Omit<HTMLProps<HTMLDivElement>, "ref">;

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ text, children, className, trigger = "hover", ...rest }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipId = useId();

    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    const toggleTooltip = () => setIsVisible((prev) => !prev);

    const eventHandlers =
            trigger === "hover"
              ? {
                onMouseEnter: showTooltip,
                onMouseLeave: hideTooltip,
                onFocus: showTooltip,
                onBlur: hideTooltip,
              }
              : {
                onClick: toggleTooltip,
              };

    return (
      <div
        className={clsx(styles.tooltipContainer, className)}
        ref={ref as LegacyRef<HTMLDivElement>}
        {...rest}
      >
        <div
          className={styles.target}
          {...eventHandlers}
          tabIndex={0}
          aria-describedby={isVisible ? tooltipId : undefined}
        >
          {children}
        </div>
        {isVisible && (
          <div
            id={tooltipId}
            className={styles.tooltip}
            role="tooltip"
            aria-live="polite"
          >
            {text}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
