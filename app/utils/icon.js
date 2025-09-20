import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import {
  FaApple,
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaFacebook,
  FaGoogle,
  FaTelegramPlane,
} from 'react-icons/fa';
import {
  IoIosArrowBack,
  IoIosArrowDropright,
  IoMdArrowDropdown,
} from 'react-icons/io';
import { GrAlarm } from 'react-icons/gr';
import {
  MdErrorOutline,
  MdKeyboardArrowRight,
  MdOutlineCurrencyRupee,
  MdOutlineNotificationsActive,
} from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { GoCopy } from 'react-icons/go';
import { BiEditAlt } from 'react-icons/bi';
import { LuHistory, LuPlus } from 'react-icons/lu';
import { FiX } from 'react-icons/fi';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

export const reactIcons = {
  arrow: <IoIosArrowBack />,
  googal: <FaGoogle />,
  apple: <FaApple />,
  facebook: <FaFacebook />,
  alarm: <GrAlarm />,
  notifiy: <MdOutlineNotificationsActive />,
  refresh: <HiOutlineRefresh />,
  error: <MdErrorOutline />,
  rightarrow: <IoIosArrowDropright />,
  copy: <GoCopy />,
  edit: <BiEditAlt />,
  history: <LuHistory />,
  rightArrow: <MdKeyboardArrowRight />,
  downArrow: <IoMdArrowDropdown />,
  rupee: <MdOutlineCurrencyRupee />,
  plus: <LuPlus />,
  ceoss: <FiX />,
  leftarrow: <FaArrowLeft />,
  rightarroww: <FaArrowRight />,
  backarrow: <FaChevronLeft />,
  telegram: <FaTelegramPlane />,
  eyeClose: <IoEyeOffOutline />,
  eye: <IoEyeOutline />,
  exclamationMark: <AiOutlineExclamationCircle color="red" />,
};
