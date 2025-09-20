import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const ResultModal = ({ showResult, onClose, resultData }) => {
  const [autoClose, setAutoClose] = useState(
    localStorage?.getItem('autoClose') === 'true',
  );

  useEffect(() => {
    if (showResult && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showResult, autoClose, onClose]);

  const handleCheckboxChange = (e) => {
    const isChecked = e?.target?.checked;
    setAutoClose(isChecked);
    localStorage.setItem('autoClose', isChecked);
  };

  if (!showResult || !resultData || !resultData.length) return null;

  return (
    <div className="fixed inset-0 flex flex-col gap-[20px] items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal with Swiper */}
      <div className="relative max-w-[20rem] w-[295px]">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="result-swiper"
          spaceBetween={30}
        >
          {resultData.map((result, index) => {
            const { bets } = result || {};
            const winningBets =
              bets?.filter((bet) => bet?.status === 'WON') || [];
            const totalWinningAmount = winningBets.reduce(
              (sum, bet) => sum + bet?.payoutAmount,
              0,
            );
            const userLost = winningBets?.length === 0;
            const backgroundImage = userLost
              ? '/images/lose.png'
              : '/images/winning.png';

            return (
              <SwiperSlide key={index}>
                <div
                  className={`${
                    userLost ? 'pl-2' : 'pl-4'
                  } relative h-[412px] rounded-2xl shadow-xl overflow-hidden flex flex-col justify-end`}
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    width: '100%',
                  }}
                >
                  <div className="w-full p-4 flex flex-col justify-end gap-3">
                    {userLost ? (
                      <h2 className="text-[#6889B1] text-[24px] font-[800] text-center font-azeret">
                        Lose
                      </h2>
                    ) : (
                      <h2 className="text-[20px] font-[800] text-center font-azeret">
                        Congratulations
                      </h2>
                    )}
                    <div className="flex gap-2 font-medium text-10 items-center">
                      <p className={`${userLost ? 'text-[#6889B1]' : ''}`}>
                        Lottery results
                      </p>{' '}
                      {userLost ? (
                        <p className="bg-[#6889B1] rounded-[8px] border border-white px-[15px] py-[2px]">
                          {result?.result?.color}
                        </p>
                      ) : (
                        <div className="relative flex items-center justify-center rounded-[8px] border border-white px-3 py-[2px] text-white font-medium">
                          <span
                            className="absolute inset-0 rounded-[8px]"
                            style={{
                              background:
                                result?.result?.winningNumber == 5
                                  ? 'linear-gradient(120deg, #23A455 50%, #8C48CC 50%)'
                                  : result?.result?.winningNumber == 0
                                  ? 'linear-gradient(120deg, #A40100 50%, #8C48CC 50%)'
                                  : result?.result?.color === 'green'
                                  ? 'linear-gradient(120deg, #23A455 50%, #23A455 50%)'
                                  : result?.result?.color === 'red'
                                  ? 'linear-gradient(120deg, #A40100 50%, #A40100 50%)'
                                  : 'linear-gradient(120deg, #8C48CC 50%, #8C48CC 50%)',
                            }}
                          ></span>
                          <span className="relative z-10">
                            {result?.result?.color}
                          </span>
                        </div>
                      )}
                      {userLost ? (
                        <p className="bg-[#6889B1] rounded-full border border-white w-[30px] h-full text-center">
                          {result?.result?.winningNumber}
                        </p>
                      ) : (
                        <div
                          className="relative flex items-center justify-center w-[30px] h-[30px] text-white text-10 border border-white rounded-full"
                          style={{
                            background:
                              result?.result?.winningNumber == 5
                                ? 'linear-gradient(120deg, #23A455 50%, #8C48CC 50%)'
                                : result?.result?.winningNumber == 0
                                ? 'linear-gradient(120deg, #A40100 50%, #8C48CC 50%)'
                                : result?.result?.color === 'green'
                                ? 'linear-gradient(120deg, #23A455 50%, #23A455 50%)'
                                : result?.result?.color === 'red'
                                ? 'linear-gradient(120deg, #A40100 50%, #A40100 50%)'
                                : 'linear-gradient(120deg, #8C48CC 50%, #8C48CC 50%)',
                          }}
                        >
                          <span className="relative z-10">
                            {result?.result?.winningNumber}
                          </span>
                        </div>
                      )}
                      {userLost ? (
                        <p className="bg-[#6889B1] rounded-[8px] border border-white px-[15px] py-[2px]">
                          {result?.result?.numberType}
                        </p>
                      ) : (
                        <div className="relative flex items-center justify-center rounded-[8px] border border-white px-3 py-[2px] text-white font-medium">
                          <span
                            className="absolute inset-0 rounded-[8px]"
                            style={{
                              background:
                                result?.result?.winningNumber == 5
                                  ? 'linear-gradient(120deg, #23A455 50%, #8C48CC 50%)'
                                  : result?.result?.winningNumber == 0
                                  ? 'linear-gradient(120deg, #A40100 50%, #8C48CC 50%)'
                                  : result?.result?.color === 'green'
                                  ? 'linear-gradient(120deg, #23A455 50%, #23A455 50%)'
                                  : result?.result?.color === 'red'
                                  ? 'linear-gradient(120deg, #A40100 50%, #A40100 50%)'
                                  : 'linear-gradient(120deg, #8C48CC 50%, #8C48CC 50%)',
                            }}
                          ></span>
                          <span className="relative z-10">
                            {result?.result?.numberType}
                          </span>
                        </div>
                      )}
                    </div>
                    {userLost ? (
                      // <div className="h-[85px]">
                      //   <img
                      //     src="/images/losing.png"
                      //     className="h-full w-[98%]"
                      //   />
                      // </div>
                      <div
                        className="w-[98%] h-[84px] bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center gap-2 pt-1"
                        style={{ backgroundImage: "url('/images/losing.png')" }}
                      >
                        <div className="text-[#FB6262] mb-12">
                          <h3 className="font-medium text-10"></h3>
                          <h2 className="text-15 font-[700]">
                            {/* ₹{totalWinningAmount.toFixed(2)} */}
                          </h2>
                        </div>

                        <p className="text-[11px] text-[#B4B2AF] font-semibold mb-1">
                          Period {result?.poolType}
                          {result?.result?.poolId}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="w-[98%] h-[84px] bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center gap-2 pt-1"
                        style={{ backgroundImage: "url('/images/win.png')" }}
                      >
                        <div className="text-[#FB6262]">
                          <h3 className="font-medium text-10">Bonus</h3>
                          <h2 className="text-15 font-[700]">
                            ₹{totalWinningAmount?.toFixed(2)}
                          </h2>
                        </div>

                        <p className="text-[11px] text-[#B4B2AF] font-semibold mb-1">
                          Period {result?.poolType}
                          {result?.result?.poolId}
                        </p>
                      </div>
                    )}
                    <div className="relative z-10 flex items-center gap-[6px] text-12 text-white">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded-full border border-white cursor-pointer checked:bg-white checked:border-transparent checked:ring-2 checked:ring-white"
                        checked={autoClose}
                        onChange={handleCheckboxChange}
                      />
                      3 Seconds auto close
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Auto close checkbox */}

      {/* Close button */}
      <button
        onClick={onClose}
        className=" z-50 border-2 border-[#fff] cursor-pointer text-black bg-white font-[600] bg-transparent text-20 h-[40px] w-[40px] rounded-full"
      >
        X
      </button>
    </div>
  );
};

// PropTypes validation
ResultModal.propTypes = {
  showResult: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resultData: PropTypes.array,
};

export default ResultModal;
