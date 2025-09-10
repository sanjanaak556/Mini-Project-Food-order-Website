import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";

const STATUS_STEPS = [
  "Order Placed",
  "Pending",
  "Prepared",
  "Out for Delivery",
  "Delivered",
];

export default function VerticalTracker({ status }) {
  const [progress, setProgress] = useState(0);

  // Compute target step index
  const targetIndex = STATUS_STEPS.indexOf(status);

  useEffect(() => {
    if (status === "Cancelled") {
      setProgress(0); // no progress for cancelled
      return;
    }

    setProgress(0);
    let start = 0;
    const interval = setInterval(() => {
      start += 0.02; // increment smooth progress
      if (start >= targetIndex) {
        start = targetIndex;
        clearInterval(interval);
      }
      setProgress(start);
    }, 30); // smooth update every 30ms

    return () => clearInterval(interval);
  }, [status, targetIndex]);

  return (
    <div className="flex items-start space-x-6 mt-6 relative">
      {/* Progress bar */}
      <div className="relative flex flex-col items-center">
        {/* Full vertical line */}
        <div className="w-1 bg-gray-300 h-[320px] rounded"></div>

        {/* Step indicators */}
        <div className="absolute flex flex-col justify-between h-[320px]">
          {STATUS_STEPS.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center mb-6">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-500
                  ${idx <= progress ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}
              >
                {idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Truck icon moves smoothly */}
        <FaTruck
          className="absolute -left-10 text-green-600 text-xl transition-all duration-200 linear"
          style={{ top: `${(progress / (STATUS_STEPS.length - 1)) * 320}px` }}
        />
      </div>

      {/* Step labels */}
      <div className="flex flex-col justify-between h-[320px]">
        {STATUS_STEPS.map((step, idx) => (
          <p
            key={idx}
            className={`mb-10 transition-colors duration-500 ${idx <= progress ? "font-bold text-green-600" : "text-gray-500"
              }`}
          >
            {step}
          </p>
        ))}
      </div>
    </div>
  );
}

