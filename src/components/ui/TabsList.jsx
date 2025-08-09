const TabsList = ({ children, className = "", selectedValue, setValue }) => {
  return (
    <div className={className}>
      {children &&
        Array.isArray(children) &&
        children.map((child) =>
          child && child.props
            ? {
                ...child,
                props: {
                  ...child.props,
                  selectedValue,
                  setValue,
                },
              }
            : child
        )}
    </div>
  );
};

export default TabsList;
