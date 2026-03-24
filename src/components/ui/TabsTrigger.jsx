const TabsTrigger = ({
  value,
  children,
  className = "",
  selectedValue,
  setValue,
}) => {
  const isActive = value === selectedValue;

  return (
    <button
      onClick={() => setValue(value)}
      className={`${className} ${isActive ? "data-[state=active]" : ""}`}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </button>
  );
};

export default TabsTrigger;
