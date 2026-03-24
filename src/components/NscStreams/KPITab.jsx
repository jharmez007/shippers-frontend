const KPITab = ({ services, activeService, onChange }) => {
  return (
    <div className="flex gap-2 border-b">
      {services.map((service) => (
        <button
          key={service}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors duration-200 ${
            activeService === service ? 'border-primary text-primary' : 'border-transparent text-gray-400'
          }`}
          onClick={() => onChange(service)}
        >
          {service}
        </button>
      ))}
    </div>
  );
};

export default KPITab;