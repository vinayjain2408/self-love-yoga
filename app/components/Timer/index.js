/* eslint-disable react-hooks/exhaustive-deps */
// src/Timer.js
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const Timer = ({ expireDate, type }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expireDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math?.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math?.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math?.floor((difference / 1000 / 60) % 60),
        seconds: Math?.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const padWithZero = (num) => (num < 10 ? `0${num}` : num);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expireDate]);

  return (
    <>
      {type === 'Lottery' && (
        <div className="flex-center gap-6 mt-4 ">
          {/* {(timeLeft.days || timeLeft.days == '0') && (
            <div>
              <p className="border border-[#DBDBDB] py-2 px-3 rounded-[4px] text-center md:text-[40px] text-[30px] font-roboto">
                {padWithZero(timeLeft.days) || '00'}
              </p>
              <p className="text-12 font-roboto text-center">Days</p>
            </div>
          )} */}
          <div>
            <p className="border border-[#DBDBDB] py-2 px-3 rounded-[4px] text-center md:text-[40px] text-[30px] font-roboto">
              {padWithZero(timeLeft?.hours) || '00'}
            </p>
            <p className="text-12 font-roboto text-center">Hours</p>
          </div>
          <div>
            <p className="border border-[#DBDBDB] py-2 px-3 rounded-[4px] text-center md:text-[40px] text-[30px] font-roboto">
              {padWithZero(timeLeft?.minutes) || '00'}
            </p>
            <p className="text-12 font-roboto text-center">Minutes</p>
          </div>
          <div>
            <p className="border border-[#DBDBDB] py-2 px-3 rounded-[4px] text-center md:text-[40px] text-[30px] font-roboto">
              {padWithZero(timeLeft?.seconds) || '00'}
            </p>
            <p className="text-12 font-roboto text-center">Seconds</p>
          </div>
        </div>
      )}
      {type === 'PowerBall' && (
        <div className="flex flex-row sm:flex-col items-center gap-5 sm:gap-0">
          <p className="text-center font-roboto text-14">TIMER</p>
          <div className="flex-center gap-2">
            {/* <div>
              <p className="text-12 font-roboto text-center">Days</p>
              <p className="bg-white py-1 px-2 text-center text-[27px] font-roboto">
                {padWithZero(timeLeft.days) || '00'}
              </p>
            </div> */}
            <div>
              <p className="text-12 font-roboto text-center">Hours</p>
              <p className="bg-white py-1 px-2 text-center text-[27px] font-roboto">
                {padWithZero(timeLeft?.hours) || '00'}
              </p>
            </div>
            <div>
              <p className="text-12 font-roboto text-center">Minutes</p>
              <p className="bg-white py-1 px-2 text-center text-[27px] font-roboto">
                {padWithZero(timeLeft?.minutes) || '00'}
              </p>
            </div>
            <div>
              <p className="text-12 font-roboto text-center">Seconds</p>
              <p className="bg-white py-1 px-2 text-center text-[27px] font-roboto">
                {padWithZero(timeLeft?.seconds) || '00'}
              </p>
            </div>
          </div>
        </div>
      )}

      {type === 'MobileTimerPowerBall' && (
        <div className="flex-center gap-2 mb-2">
          {/* <div>
            <p className="text-[8px] gradient-text font-roboto text-center">
              Days
            </p>
            <p className="bg-white rounded-[2px] text-black px-1 text-center text-[20px] font-roboto">
              {padWithZero(timeLeft.days) || '00'}
            </p>
          </div> */}
          <div>
            <p className="text-[8px] gradient-text font-roboto text-center">
              Hours
            </p>
            <p className="bg-white rounded-[2px] text-black px-1 text-center text-[20px] font-roboto">
              {padWithZero(timeLeft?.hours) || '00'}
            </p>
          </div>
          <div>
            <p className="text-[8px] gradient-text font-roboto text-center">
              Minutes
            </p>
            <p className="bg-white rounded-[2px] text-black px-1 text-center text-[20px] font-roboto">
              {padWithZero(timeLeft?.minutes) || '00'}
            </p>
          </div>
          <div>
            <p className="text-[8px] gradient-text font-roboto text-center">
              Seconds
            </p>
            <p className="bg-white rounded-[2px] text-black px-1 text-center text-[20px] font-roboto">
              {padWithZero(timeLeft?.seconds) || '00'}
            </p>
          </div>
        </div>
      )}

      {type === 'MobileTimerLottery' && (
        <div className="my-3">
          <p className="text-center font-roboto text-14 mb-2">TIMER</p>
          <div className="flex-center gap-2 text-black">
            {/* <div>
              <p className="bg-white rounded-[2px] py-1 px-3 text-center text-[23px] font-roboto">
                {padWithZero(timeLeft.days) || '00'}
              </p>
              <p className="text-10 font-roboto text-center gradient-text">
                Days
              </p>
            </div> */}
            <div>
              <p className="bg-white rounded-[2px] py-1 px-3 text-center text-[23px] font-roboto">
                {padWithZero(timeLeft?.hours) || '00'}
              </p>
              <p className="text-10 font-roboto text-center gradient-text">
                Hours
              </p>
            </div>
            <div>
              <p className="bg-white rounded-[2px] py-1 px-3 text-center text-[23px] font-roboto">
                {padWithZero(timeLeft.minutes) || '00'}
              </p>
              <p className="text-10 font-roboto text-center gradient-text">
                Minutes
              </p>
            </div>
            <div>
              <p className="bg-white rounded-[2px] py-1 px-3 text-center text-[23px] font-roboto">
                {padWithZero(timeLeft.seconds) || '00'}
              </p>
              <p className="text-10 font-roboto text-center gradient-text">
                Seconds
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Timer;
