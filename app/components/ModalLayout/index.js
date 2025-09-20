import { Modal } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const ModalLayout = ({
  open,
  onClose,
  title,
  children,
  actions,
  buttoncss,
  titleBgColor = 'bg-custom-gradient',
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative w-[320px] max-w-[430px] rounded-xl shadow-lg overflow-auto bg-gradient-to-l from-[#DFB11E] via-[#FEF888] to-[#F0CF4E]"
          onClick={(e) => e?.stopPropagation()}
        >
          <div
            className={`text-black font-montserrat font-bold text-18 leading-5 w-full shadow-md px-8 py-4 ${titleBgColor} flex justify-center relative`}
          >
            <h4 className="text-lg">{title}</h4>
          </div>

          <div className="p-2 h-[170px] bg-[#333332] text-white">
            {children}
          </div>

          <div className={`${buttoncss} flex justify-center gap-2`}>
            {actions}
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalLayout.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  buttoncss: PropTypes.string,
  titleBgColor: PropTypes.string,
};

export default ModalLayout;

// import { Modal } from '@mui/material';
// import React from 'react';
// import PropTypes from 'prop-types';

// const ModalLayout = ({
//   open,
//   onClose,
//   title,
//   children,
//   actions,

//   buttoncss,
//   titleBgColor = 'bg-custom-gradient',
// }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//     >
//       <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center  bg-black bg-opacity-50  backdrop-blur-sm">
//         <button
//           className="w-[40px] h-[40px] rounded-full items-center justify-center text-20 text-black bg-gradient-to-r from-[#DFB11E] via-[#FEF888] to-[#F0CF4E]"
//           onClick={onClose}
//         >
//           X
//         </button>
//         <div className="relative w-[320px] max-w-[430px] rounded-xl shadow-lg overflow-auto bg-gradient-to-l from-[#DFB11E] via-[#FEF888] to-[#F0CF4E]">
//           {/* Header with Close Button */}
//           <div
//             className={`text-black font-montserrat font-bold text-18 leading-5 w-full shadow-md px-8 py-4 ${titleBgColor} flex justify-center relative`}
//           >
//             <h4 className="text-lg">{title}</h4>
//             {/* <button
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-xl"
//               onClick={onClose}
//             >
//               &times;
//             </button> */}
//           </div>

//           {/* Content */}
//           <div className="p-2 h-[200px] bg-[#333332] text-white">
//             {children}
//           </div>

//           {/* Actions */}
//           <div className={`${buttoncss} flex justify-center gap-2 `}>
//             {actions}
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// ModalLayout.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
//   actions: PropTypes.node,
//   bgcolor: PropTypes.string,
//   data: PropTypes.object,
//   buttoncss: PropTypes.string,
//   titleBgColor: PropTypes.string,
// };

// export default ModalLayout;
