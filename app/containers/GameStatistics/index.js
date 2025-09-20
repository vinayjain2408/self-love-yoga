import { TopBar } from '@/components';
import { getAuthReq } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icon';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const GameStatistics = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Today');
  const [totalData, setTotalData] = useState(0);
  const userId = useSelector((state) => state.userData.user?.id);
  const tabs = [
    { key: 'TODAY', label: t('TODAY') },
    { key: 'YESTERDAY', label: t('YESTERDAY') },
    { key: 'THIS_WEEK', label: t('THIS_WEEK') },
    { key: 'THIS_MONTH', label: t('THIS_MONTH') },
  ];

  const getDateRange = (tab) => {
    const today = dayjs();
    switch (tab) {
      case 'Today':
        return {
          startDate: today.format('YYYY/MM/DD'),
          endDate: today.add(1, 'day').format('YYYY/MM/DD'),
        };
      case 'Yesterday':
        return {
          startDate: today.subtract(1, 'day').format('YYYY/MM/DD'),
          endDate: today.format('YYYY/MM/DD'),
        };
      case 'This week':
        return {
          startDate: today.subtract(6, 'day').format('YYYY/MM/DD'),
          endDate: today.add(1, 'day').format('YYYY/MM/DD'),
        };
      case 'This month':
        return {
          startDate: today.startOf('month').format('YYYY/MM/DD'),
          endDate: today.add(1, 'day').format('YYYY/MM/DD'),
        };
      default:
        return {
          startDate: today.format('YYYY/MM/DD'),
          endDate: today.add(1, 'day').format('YYYY/MM/DD'),
        };
    }
  };
  const GetStatistics = async () => {
    const { startDate, endDate } = getDateRange(activeTab);
    try {
      const response = await getAuthReq(
        `/bet/game-statics?startDate=${startDate}&endDate=${endDate}&userId=${userId}`,
      );
      if (response?.status) {
        setTotalData(response?.data);
      }
    } catch (e) {
      console.error('Error fetching game statistics:', e);
    }
  };

  useEffect(() => {
    if (userId) {
      GetStatistics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, userId]);

  return (
    <>
      <div className="px-4">
        <TopBar heading={t('GAME')} />
        <section className="mt-6">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`${
                  activeTab === tab.label
                    ? 'bg-custom-gradient text-black'
                    : 'bg-primary-600 text-white'
                } w-full py-1 text-[12px] border border-yellow-300 font-semibold font-poppins rounded-full transition`}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>
        <section>
          <div className="flex justify-between p-2 bg-primary-600 rounded-xl mt-8 py-4 px-4 items-center">
            <div>
              <p className="font-poppins font-medium leading-6">
                {t('TOTAL_BET')}
              </p>
              <h2 className="flex gap-1 items-center font-poppins font-semibold text-[48.67px] leading-[73px] text-[#DFB11E]">
                {reactIcons.rupee}
                {/* {totalData?.total?.totalBetAmount} */}
                {totalData?.total?.totalBetAmount.toLocaleString('en-IN', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </h2>
            </div>
            <div>
              <img src={`${process.env.IMAGE_KIT}/images/wallet.png`} alt="" />
            </div>
          </div>
        </section>
        <section>
          <div className="bg-[#05012B] shadow-inner-white px-2 my-4 py-4 rounded-lg">
            <div className=" flex items-center justify-between gap-10  p-2">
              <div className="w-[80px]">
                <img
                  src={`${process.env.IMAGE_KIT}/images/wingowallet.png`}
                  alt="Crown Icon"
                  className=" rounded-full width=[80px]"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between gap-1">
                <div className="items-center w-full gap-3 mb-2">
                  <span className="font-poppins font-medium text-16  leading-6">
                    {t('WINGO')} 30 sec
                  </span>
                </div>
                <div className="relative w-full">
                  <div className="absolute left-2 top-2 w-[2px] h-[calc(100%-28px)] bg-gray-700"></div>

                  <div className="">
                    <div className="relative flex justify-between items-center">
                      <div className="absolute flex items-center justify-center left-0 w-4 h-4 bg-gradient-to-r from-[#DFB11E] via-[#FEF888] to-[#F0CF4E] border border-white rounded-full z-10">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="flex justify-between gap-[40px] items-center w-full pl-8">
                        <p className="font-montserrat font-normal text-10 leading-[14.63px]">
                          {t('TOTAL_BET')}
                        </p>
                        <p className="font-poppins font-semibold text-18 leading-[30px]">
                          ₹
                          {/* {totalData?.['30-seconds']?.totalBetAmount?.toFixed(
                            2,
                          )} */}
                          {totalData?.[
                            '30-seconds'
                          ]?.totalBetAmount.toLocaleString('en-IN', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center">
                      <div className="absolute left-0 w-4 h-4 bg-gray-700 rounded-full z-10"></div>
                      <div className="flex justify-between items-center w-full pl-8">
                        <p className="font-montserrat font-normal text-10 leading-[14.63px]">
                          {t('NUMBER_OF_BETS')}
                        </p>
                        <p className="font-poppins font-semibold text-18 leading-[30px]">
                          {totalData?.['30-seconds']?.totalBet}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center">
                      <div className="absolute left-0 w-4 h-4 bg-gray-700 rounded-full z-10"></div>
                      <div className="flex justify-between gap-[36px] items-center w-full pl-8">
                        <p className="font-montserrat font-normal text-10 leading-[14.63px]">
                          {t('WINNING-AMOUNT')}
                        </p>
                        <p className="font-poppins text-[#DFB11E] font-semibold text-18 leading-[30px]">
                          ₹
                          {/* {totalData?.['30-seconds']?.totalWin?.toFixed(2)} */}
                          {totalData?.['30-seconds']?.totalWin.toLocaleString(
                            'en-IN',
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src={`${process.env.IMAGE_KIT}/images/Line.svg`}
                alt=""
                className="w-full"
              />
            </div>
            <div className=" flex items-center  justify-between gap-10 p-2">
              <div className="w-[80px]">
                <img
                  src={`${process.env.IMAGE_KIT}/images/casinowallet.png`}
                  alt="Crown Icon"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between gap-1">
                <div className="items-center w-full gap-3 mb-2">
                  <span className="font-poppins font-medium text-16  leading-6">
                    {t('WINGO')} 1 min
                  </span>
                </div>
                <div className="relative w-full">
                  <div className="absolute left-2 top-2 w-[2px] h-[calc(100%-28px)] bg-gray-700"></div>

                  <div className="">
                    <div className="relative flex justify-between items-center">
                      <div className="absolute flex items-center justify-center left-0 w-4 h-4 bg-gradient-to-r from-[#DFB11E] via-[#FEF888] to-[#F0CF4E] border border-white rounded-full z-10">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="flex justify-between gap-[36px] items-center w-full pl-8">
                        <p className="font-montserrat font-normal text-10 leading-[14.63px]">
                          {t('TOTAL_BET')}
                        </p>
                        <p className="font-poppins font-semibold text-18 leading-[30px]">
                          ₹
                          {/* {totalData?.['1-minute']?.totalBetAmount?.toFixed(2)} */}
                          {totalData?.[
                            '1-minute'
                          ]?.totalBetAmount.toLocaleString('en-IN', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center">
                      <div className="absolute left-0 w-4 h-4 bg-gray-700 rounded-full z-10"></div>
                      <div className="flex justify-between items-center w-full pl-8">
                        <p className="font-montserrat font-normal text-10 leading-[14.63px]">
                          {t('NUMBER_OF_BETS')}
                        </p>
                        <p className="font-poppins font-semibold text-18 leading-[30px]">
                          {totalData?.['1-minute']?.totalBet}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center">
                      <div className="absolute left-0 w-4 h-4 bg-gray-700 rounded-full z-10"></div>
                      <div className="flex justify-between gap-[36px] items-center w-full pl-8">
                        <p className="font-montserrat font-normal text-10 leading-[14.63px]">
                          {t('WINNING-AMOUNT')}
                        </p>
                        <p className="font-poppins text-[#DFB11E] font-semibold text-18 leading-[30px]">
                          ₹
                          {/* {totalData?.['1-minute']?.totalWin?.toFixed(2)} */}
                          {totalData?.['1-minute']?.totalWin.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img
                src={`${process.env.IMAGE_KIT}/images/Line.svg`}
                alt=""
                className="w-full"
              />
            </div>
            <div className=" flex items-center  justify-between gap-10 p-2">
              <div className="w-[80px] ">
                <img
                  src={`${process.env.IMAGE_KIT}/images/casinowallet.png`}
                  alt="Crown Icon"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between gap-1">
                <div className="items-center w-full gap-1 mb-2">
                  <span className="font-poppins font-medium text-16  leading-6">
                    {t('WINGO')} 3 min
                  </span>
                </div>
                <div className="relative w-full">
                  <div className="absolute left-2 top-2 w-[2px] h-[calc(100%-28px)] bg-gray-700"></div>

                  <div className="">
                    <div className="relative flex justify-between items-center">
                      <div className="absolute flex items-center justify-center left-0 w-4 h-4 bg-gradient-to-r from-[#DFB11E] via-[#FEF888] to-[#F0CF4E] border border-white rounded-full z-10">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="flex justify-between gap-[36px] items-center w-full pl-8">
                        <p className="font-montserrat font-normal text-10 ">
                          {t('TOTAL_BET')}
                        </p>
                        <p className="font-poppins font-semibold text-18 leading-[30px]">
                          ₹
                          {totalData?.[
                            '3-minute'
                          ]?.totalBetAmount.toLocaleString('en-IN', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                          {/* {totalData?.['3-minute']?.totalBetAmount?.toFixed(2)} */}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center">
                      <div className="absolute left-0 w-4 h-4 bg-gray-700 rounded-full z-10"></div>
                      <div className="flex justify-between items-center w-full pl-8">
                        <p className="font-montserrat font-normal text-10 ">
                          {t('NUMBER_OF_BETS')}
                        </p>
                        <p className="font-poppins font-semibold text-18 leading-[30px]">
                          {totalData?.['3-minute']?.totalBet}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center">
                      <div className="absolute left-0 w-4 h-4 bg-gray-700 rounded-full z-10"></div>
                      <div className="flex justify-between gap-[36px] items-center w-full pl-8">
                        <p className="font-montserrat font-normal text-10 ">
                          {t('WINNING-AMOUNT')}
                        </p>
                        <p className="font-poppins text-[#DFB11E] font-semibold text-18 leading-[30px]">
                          ₹
                          {totalData?.['3-minute']?.totalWin.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            },
                          )}
                          {/* {totalData?.['3-minute']?.totalWin?.toFixed(2)} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GameStatistics;
