import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from './ModalLayout'; // Import your ModalLayout component

const ReusableModal = ({ open, onClose, title, children }) => {
  return (
    <>
      {/* Reusable Modal */}
      <ModalLayout
        open={open}
        onClose={onClose}
        title={title}
        actions={
          <button className="text-black justify-center flex" onClick={onClose}>
            Close
          </button>
        }
        buttoncss="bg-custom-gradient font-poppins text-16 leading-[24px] font-medium"
        titleBgColor="bg-custom-gradient"
      >
        <div className="p-2 font-poppins text-16 leading-[24px] h-60 overflow-y-auto text-black text-sm">
          {children}
        </div>
      </ModalLayout>

      {/* Close Button Outside the Modal */}
      {open && (
        <button
          onClick={onClose}
          style={{
            position: 'fixed',
            top: '10%',
            right: '50%',
            background: 'transparent',
            border: 'none',
            padding: '10px',
            borderRadius: '50%',
            backgroundImage: 'linear-gradient(to right, #FF5733, #FFBD33)',
            color: 'white',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          X
        </button>
      )}
    </>
  );
};

ReusableModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ReusableModal;
