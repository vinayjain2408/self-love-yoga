import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-9 bg-[#FFFFFF] text-white">
      {/* <div className="text-xl font-bold">GLOBAL CRYPTO</div> */}
      <img src="/images/logo.png" alt="logo" />
      <ul className="border border-[#4965d2] flex justify-center items-center space-x-5 border rounded-3xl p-2">
        <li className="text-[#4965D2] cursor-rounded-full bg-white px-4 py-1">
          Invest
        </li>
        <li className="text-[#4965D2] cursor-pointer">
          Trading
          <button className="border border-[#E0D607] text-xs border bg-[#E0D607] text-[#FFFFFF] rounded-full ml-1 px-1 py-0 font-semibold">
            New
          </button>
        </li>
        <li className="text-[#4965d2] cursor-pointer ">PMS</li>
        <li className="text-[#4965D2] cursor-pointer ">Experts Pick</li>
        <li className="text-[#4965d2] cursor-pointer ">Blogs</li>
        <li className="text-[#4965d2] cursor-pointer ">About</li>
        <li></li>
      </ul>
      <div className="space-x-4">
        <button className="border border-[#4965D2] rounded-full px-6 py-1 text-[#4965D2] font-semibold">
          Log in
        </button>
        <button className="border border-[#4965D2] border bg-[#4965D2] text-[#FFFFFF] rounded-full px-6 py-1 font-semibold">
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
