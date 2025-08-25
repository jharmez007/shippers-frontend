import { Children, cloneElement, isValidElement } from "react";

const Tabs = ({ value, onValueChange, children, className = "" }) => {
  return (
    <div className={className}>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              selectedValue: value,
              setValue: onValueChange,
            })
          : child
      )}
    </div>
  );
};

export default Tabs;
