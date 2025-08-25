
const steps = [
  { title: "STEP 1", label: "Review", status: "Complete"},
  { title: "STEP 2", label: "Recommendation", status: "In Progress" },
  { title: "STEP 3", label: "Approval", status: "Pending" },
];

const ProgressTracker = ({ currentStep }) => {

  return (
    <div className="relative flex items-start">
      

      {steps.map((step, index) => {
        let status = 'upcoming';
        if (index + 1 < currentStep) {
          status = 'completed';
        } else if (index + 1 === currentStep) {
          status = 'current';
        }

        const nextStepStatus = (() => {
            if (index + 1 >= steps.length) return null;
            if (index + 2 < currentStep) return 'completed';
            if (index + 2 === currentStep) return 'current';
            return 'upcoming';
          })();

        return (
          <div key={index} className="flex flex-col items-start relative step-item">

            {/* Step Circle and Vertical Line Wrapper */}
            <div className="flex items-center z-10">
              {/* Step Circle */}
              {status === 'completed' ? (
                <div className="w-10 h-10 bg-[#185F95] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : status === 'current' ? (
                <div className="w-10 h-10 border border-[#185F95] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#185F95] rounded-full"></div>
                </div>
              ) : (
                <div className="w-10 h-10 border opacity-30 border-[#185F95] rounded-full"></div>
              )}

              {/* Vertical Line (except after last step) */}
              {index !== steps.length - 1 && (
                <div className={`
                  ${
                    (
                      (status === 'completed' && (nextStepStatus === 'completed' || nextStepStatus === 'current')) ||
                      (status === 'current' && nextStepStatus === 'completed')
                    ) 
                      ? 'border-[#185F95] border' 
                      : 'border-[#185F95] border opacity-30'
                  }
                  w-[240px] transition-all
                `}></div>
              )}
            </div>
            
            <div className="flex flex-col items-center mt-2 relative left-[-35px]">
                {/* Step Title */}
                <p className="text-sm text-gray-500">{step.title}</p>

                {/* Step Label */}
                <p className="text-[#185F95] font-bold text-lg">{step.label}</p>

                {/* Status Badge */}
                <span
                className={`mt-1 text-sm rounded-md px-2 py-0.5 ${
                    step.status === "Complete"
                    ? "bg-green-100 text-green-700"
                    : step.status === "In Progress"
                    ? "bg-gray-200 text-gray-600"
                    : "bg-gray-100 text-gray-400"
                }`}
                >
                {step.status}
                </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProgressTracker;
