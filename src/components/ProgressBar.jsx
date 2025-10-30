
const steps = [
  { title: "STEP 1"},
  { title: "STEP 2" },
  { title: "STEP 3" },
];

export default function StepItem({ currentStep }) {

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
          <div key={index} className="flex items-start relative step-item">

            {/* Step Circle and Vertical Line Wrapper */}
            <div className="flex items-center z-10">
              {/* Step Circle */}
              {status === 'completed' ? (
                <div className="w-8 h-8 bg-[#185F95] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : status === 'current' ? (
                <div className="w-8 h-8 border border-[#185F95] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#185F95] rounded-full"></div>
                </div>
              ) : (
                <div className="w-8 h-8 border opacity-30 border-[#185F95] rounded-full"></div>
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
                  w-16 transition-all
                `}></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
