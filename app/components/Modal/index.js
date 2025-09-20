import React from 'react';
import PropTypes from 'prop-types';
// import { reactIcons } from '@/utils/icon';

const Modal = ({ isOpen, onClose, title, content, buttonText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-12">
      <div className=" [background:linear-gradient(149.66deg,_#797979_6.28%,_#DFDFDF_93.81%)] rounded-xl shadow-lg w-96 max-h-[90vh] relative overflow-hidden">
        <div className="bg-custom-gradient text-center py-4 text-black font-bold">
          {title}
        </div>
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
        >
          {reactIcons.ceoss}
        </button> */}
        <div className="p-4 text-center text-gray-800 text-sm overflow-y-auto max-h-60">
          {content}
        </div>
        <div className="bg-[#0000009E] text-center py-2">
          <button
            onClick={onClose}
            className="bg-custom-gradient text-black px-20 py-2 rounded-md font-semibold"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Modal;
