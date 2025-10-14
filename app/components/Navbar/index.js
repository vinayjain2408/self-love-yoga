import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-[#008e64] text-white">
      {/* <div className="text-xl font-bold">GLOBAL CRYPTO</div> */}
      <img src="/images/logocrypto.png" alt="logo" />
      <ul className="flex space-x-6 border rounded-3xl p-2.5">
        <li className="hover:text-[#006b4f] text-[#008e64] cursor-pointer rounded-full bg-white px-4 py-1 ">
          Invest
        </li>
        <li className="hover:text-[#008e64] cursor-pointer">PMS</li>
        <li className="hover:text-[#008e64] cursor-pointer">Experts Pick</li>
        <li className="hover:text-[#008e64] cursor-pointer">Blogs</li>
        <li className="hover:text-[#008e64] cursor-pointer">About</li>
      </ul>
      <div className="space-x-4">
        <button className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#006b4f]">
          Log in
        </button>
        <button className="bg-white text-[#008e64] rounded-full px-4 py-1 font-semibold hover:bg-yellow-300">
          Sign up
        </button>
      </div>
    </nav>
  );
}

// import { reactIcons } from '@/utils/icon';
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LocalContext from '../../contexts/LocaleContext';
// // import Cookies from 'js-cookie';
// const Navbar = () => {
//   const navigate = useNavigate();
//   const { LOCALE } = useContext(LocalContext);
//   return (
//     <>
//       <nav className="relative bg-[#011030] z-50">
//         <div className="py-2 shadow-custom fixed -top-1 left-0 right-0 mx-auto bg-[#011030] z-50">
//           <div className="px-4 flex items-center justify-between">
//             <div className="h-[40px] ">
//               <img
//                 src={`/images/Home/gamelogo.png`}
//                 className="h-full w-full"
//               />
//             </div>
//             <div
//               onClick={() => navigate(LOCALE + '/notification')}
//               className="text-yellow-500 text-[23px]"
//             >
//               {reactIcons.notifiy}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
