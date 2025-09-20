import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

function ReactNotificationComponent({ payloads, dismissNotification }) {
  return (
    <div className="ax-center flex flex-col gap-2 items-center fixed top-4 right-4 z-50">
      {payloads.map((payload, index) => (
        <div
          key={payload?.messageId || index}
          className=" w-[320px] rounded-2xl p-[2px] bg-yellow-400"
        >
          <div className="relative flex items-start gap-3 rounded-2xl bg-[#0D1A43] px-4 py-3 text-white">
            <span className="text-2xl">🔔</span>
            <div className="flex flex-col">
              <p className="font-semibold text-base">{payload?.data?.title}</p>
              <p className="text-sm text-gray-300">{payload?.data?.body}</p>
            </div>
            <button
              className="absolute top-0 right-0 mt-[-6px] mr-[-6px] bg-red-600 border border-yellow-400 rounded-full p-1 shadow-md"
              onClick={() => dismissNotification(index)}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

ReactNotificationComponent.propTypes = {
  payloads: PropTypes.array.isRequired,
  dismissNotification: PropTypes.func.isRequired,
};

export default ReactNotificationComponent;
