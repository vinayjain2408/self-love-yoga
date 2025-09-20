import { LocaleContext } from '@/contexts';
import { reactIcons } from '@/utils/icon';
import PropTypes from 'prop-types';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';

const getColorClass = (color, winningNumber) => {
  if (winningNumber === 0)
    return 'bg-gradient-to-b from-[#A020F0] to-[#FF4A49]';
  if (winningNumber === 5)
    return 'bg-gradient-to-b from-[#00E38C] to-[#A020F0]';

  if (color?.includes('red')) return 'bg-[#FF4A49]';
  if (color?.includes('green')) return 'bg-[#00E38C]';
  if (color?.includes('blue')) return 'bg-[#BE5DFB]';
  if (color?.includes('purple')) return 'bg-[#A020F0]';

  return 'text-gray-500 bg-[#666462]';
};
const GameHistory = ({
  activeTab,
  setActiveTab,
  betHistoryData,
  setPageValue,
  isFetching,
  gameHistoryData,
  handleNextPage,
  handlePrevPage,
  pageValue,
  totalPages,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { LOCALE } = useContext(LocaleContext);
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  const handleGraph = () => {
    if (!containerRef?.current) return;

    const elements = containerRef?.current?.querySelectorAll('.winning-number');
    if (elements?.length === 0) return;
    const newLines = [];
    elements?.forEach((el, index) => {
      if (index === 0) return;
      const prev = elements[index - 1];

      const startX = prev?.offsetLeft + prev?.offsetWidth / 2;
      const startY = prev?.offsetTop + prev?.offsetHeight / 2;
      const endX = el?.offsetLeft + el?.offsetWidth / 2;
      const endY = el?.offsetTop + el?.offsetHeight / 2;

      newLines.push({ startX, startY, endX, endY });
    });
    setLines(newLines);
  };

  useLayoutEffect(() => {
    handleGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameHistoryData, containerRef.current]);
  return (
    <section className="mt-4">
      <div className=" text-white">
        <div className="flex gap-2 justify-between mb-4">
          <button
            className={`${
              activeTab === 'gameHistory'
                ? 'bg-custom-gradient text-black'
                : ' bg-[#858585] text-black'
            } w-full py-1 px-1 font-poppins font-semibold text-12 rounded-full transition`}
            onClick={() => {
              setActiveTab('gameHistory');
              setPageValue(1);
            }}
          >
            {t('GAME_HISTORY_GAME')}
          </button>
          <button
            className={`${
              activeTab === 'chart'
                ? 'bg-custom-gradient text-black'
                : 'bg-[#858585] text-black'
            } w-full p-1 font-poppins font-semibold text-12 rounded-full transition`}
            onClick={() => {
              setActiveTab('chart');
              setPageValue(1);
            }}
          >
            {t('CHART')}
          </button>
          <button
            className={`${
              activeTab === 'myHistory'
                ? 'bg-custom-gradient text-black'
                : 'bg-[#858585] text-black'
            } w-full p-1 font-poppins font-semibold text-12 rounded-full transition`}
            onClick={() => {
              setActiveTab('myHistory');
              setPageValue(1);
            }}
          >
            {t('MY_HISTORY')}
          </button>
        </div>

        <div>
          {/* Game history  */}
          {activeTab === 'gameHistory' && (
            <div className="bg-[#1E1E1E] rounded-lg shadow-[inset_0px_0px_10px_1px_rgba(255,255,255,0.2)]">
              <table className="table-auto w-full  text-gray-200">
                <thead>
                  <tr className="bg-[#2F2F31]">
                    <th className="p-1 lg:p-2  font-medium text-14 leading-[20px] font-inter">
                      {t('PERIOD')}
                    </th>
                    <th className="p-1 lg:p-2  font-medium text-14 leading-[20px] font-inter">
                      {t('NUMBER')}
                    </th>

                    <th className="p-1 lg:px-2   font-medium text-14 leading-[20px] font-inter">
                      {t('BIG_SMALL')}
                    </th>
                    <th className="p-1 lg:px-4   font-medium text-14 leading-[20px] font-inter">
                      {t('COLOR')}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isFetching
                    ? [...Array(5)].map((_, index) => (
                        <tr
                          key={index}
                          className="border-t border-gray-600 bg-[#1E1E1E]"
                        >
                          <td className="p-2">
                            <Skeleton className="h-5 w-24" />
                          </td>
                          <td className="p-2 text-center">
                            <Skeleton className="h-6 w-10" />
                          </td>
                          <td className="p-2 text-center">
                            <Skeleton className="h-5 w-12" />
                          </td>
                          <td className="p-2 text-center">
                            <Skeleton className="h-5 w-16" />
                          </td>
                        </tr>
                      ))
                    : gameHistoryData?.map((item, index) => (
                        <tr
                          key={index}
                          className={`border-t border-gray-600 bg-[#1E1E1E]`}
                        >
                          <td className="p-2 font-inter font-medium text-12 leading-[20px]">
                            {item?.poolId}
                          </td>
                          <td
                            className={`p-2 text-xl font-inter leading-[20px] font-bold text-center 
        ${
          item?.result?.winningNumber === 0
            ? 'bg-gradient-to-b from-[#A40100] to-[#8602EB] bg-clip-text text-transparent'
            : item?.result?.winningNumber === 5
            ? 'bg-gradient-to-b from-[#8602EB] to-[#005E3A] bg-clip-text text-transparent'
            : item?.result?.color?.includes('red')
            ? 'text-[#A40100]'
            : item?.result?.color?.includes('green')
            ? 'text-[#005E3A]'
            : item?.result?.color?.includes('blue')
            ? 'text-[#8602EB]'
            : 'text-gray-500'
        }`}
                          >
                            {item?.result?.winningNumber ?? '-'}
                          </td>
                          <td className="p-2 text-sm text-12 leading-[20px] text-center font-inter font-medium">
                            {item?.result?.numberType === 'small'
                              ? 'Small'
                              : 'Big'}
                          </td>
                          <td className="text-center">
                            {item?.result?.color
                              ?.split(', ')
                              .map((color, colorIndex) => (
                                <span
                                  key={colorIndex}
                                  className={`inline-block w-4 h-4 rounded-full ml-1 ${
                                    color === 'red'
                                      ? 'bg-[#A40100]'
                                      : color === 'green'
                                      ? 'bg-[#005E3A]'
                                      : color === 'blue'
                                      ? 'bg-[#BE5DFB]'
                                      : color === 'violet'
                                      ? 'bg-[#8602EB]'
                                      : 'bg-gray-500'
                                  }`}
                                ></span>
                              ))}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Chart  */}
          {activeTab === 'chart' && (
            <div className="py-2 bg-[#2F2F31]  rounded-lg w-full shadow-[inset_0px_0px_10px_1px_rgba(255,255,255,0.2)]">
              <div className="grid grid-cols-2 gap-2  text-center mb-2 text-white px-2 text-sm">
                <div className="font-medium text-14 leading-[20px]  mr-10 font-inter">
                  {t('PERIOD')}
                </div>
                <div className="font-medium text-14 leading-[20px] font-inter">
                  {t('NUMBER')}
                </div>
              </div>

              <div className="space-y-2 bg-[#1E1E1E]" ref={containerRef}>
                {isFetching
                  ? Array?.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="w-full border-b-[1px] animate-pulse"
                      >
                        <div className="flex gap-3 justify-between items-center text-white px-2 space-y-2">
                          <div
                            className="bg-gray-700 rounded-md w-20
                         h-4"
                          ></div>

                          <div className="overflow-x-auto flex justify-end font-roboto flex-1 text-[10px] leading-[16px] pb-2">
                            <div className="flex gap-1 min-w-max">
                              {Array?.from({ length: 10 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="w-3 h-4 bg-gray-600 rounded-full"
                                ></div>
                              ))}
                              <div className="w-3 h-4 bg-gray-500 rounded-full ml-1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : gameHistoryData?.map((row) => (
                      <div
                        key={row?.result?.poolId}
                        className="w-full border-b-[1px]"
                      >
                        <div className="flex gap-3 justify-between items-center text-white  sm:px-2 px-0 space-y-2">
                          <div className="text-12 w-12 font-roboto leading-[14.65px] font-normal">
                            {row?.result?.poolId}
                          </div>

                          <div className="overflow-x-auto flex justify-end font-roboto flex-1 text-[10px] leading-[16px] pb-2">
                            <div className="flex gap-1 min-w-max">
                              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-4 rounded-full font-roboto text-[12px] flex items-center justify-center text-xs flex-shrink-0
                ${
                  num === row?.result?.winningNumber
                    ? `winning-number ${getColorClass(
                        row?.result?.color,
                        num,
                      )} text-white`
                    : 'border border-[#666462] text-[#666462]'
                }`}
                                >
                                  {num}
                                </div>
                              ))}

                              <div
                                className={`w-3 h-4 rounded-full flex items-center justify-center text-[10px]
                ${
                  row?.result?.numberType === 'big'
                    ? 'bg-[#FF69B4]'
                    : 'bg-blue-500'
                }
                flex-shrink-0`}
                              >
                                {row?.result?.numberType === 'big' ? 'B' : 'S'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                <svg className="absolute top-[-8px] left-0 w-full h-full pointer-events-none">
                  {lines.map((line, index) => (
                    <line
                      key={index}
                      x1={line?.startX}
                      y1={line?.startY}
                      x2={line?.endX}
                      y2={line?.endY}
                      stroke="red"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              </div>
            </div>
          )}

          {/* My history  */}
          {activeTab === 'myHistory' && (
            <div className="bg-[#333332EB] rounded-lg">
              <div className="flex justify-end p-2">
                <button
                  className=" flex items-center bg-custom-gradient  gap-[2px] text-black font-poppins font-semibold text-16 leading-4 rounded-lg py-2 px-4"
                  onClick={() => navigate(LOCALE + '/win-go-history')}
                >
                  {t('DETAIL')} {reactIcons?.rightarrow}
                </button>
              </div>
              {isFetching ? (
                <Skeleton height={200} />
              ) : (
                <>
                  <div className="overflow-y-auto bg-[#1E1E1E] max-h-[400px]">
                    {betHistoryData.length > 0 ? (
                      betHistoryData.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between border-b border-gray-700 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium text-white
    ${
      item?.gameType === 'color'
        ? item?.selectedValue === 'green'
          ? 'bg-green-500'
          : item?.selectedValue === 'red'
          ? 'bg-red-500'
          : item?.selectedValue === 'violet'
          ? 'bg-purple-500'
          : 'bg-gray-500'
        : item?.gameType === 'big'
        ? 'bg-[#FF69B4]'
        : item?.gameType === 'small'
        ? 'bg-blue-500'
        : !isNaN(Number(item?.selectedValue))
        ? [2, 4, 6, 8].includes(Number(item?.selectedValue))
          ? 'bg-red-500'
          : [1, 3, 7, 9].includes(Number(item?.selectedValue))
          ? 'bg-green-500'
          : 'bg-gray-500'
        : 'bg-gray-500'
    }`}
                              style={
                                item?.selectedValue === '0'
                                  ? {
                                      background:
                                        'linear-gradient(180deg, #8602EB 50%, #A40100 50%)',
                                    }
                                  : item?.selectedValue === '5'
                                  ? {
                                      background:
                                        'linear-gradient(180deg, #005E3A 50%, #8602EB 50%)',
                                    }
                                  : {}
                              }
                            >
                              {String(item?.selectedValue)
                                .charAt(0)
                                .toUpperCase() +
                                String(item?.selectedValue).slice(1)}
                            </div>

                            {/* Game Details */}
                            <div>
                              <p className="text-white font-poppins leading-[18px] text-sm font-normal">
                                {item?.poolId}
                              </p>
                              <p className="text-[#A8A5A1] font-poppins text-[11.33px] leading-[17px] text-xs">
                                {new Date(item?.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p
                              className={`text-sm ${
                                item?.status === 'WON'
                                  ? 'text-green-400'
                                  : item?.status === 'LOSS'
                                  ? 'text-red-400'
                                  : 'text-yellow-400'
                              }`}
                            >
                              {item?.status === 'LOSS'
                                ? t('LOSS')
                                : item?.status === 'WON'
                                ? t('WON')
                                : t('PENDING')}
                            </p>
                            <p className="text-sm font-medium text-white">
                              {item?.status === 'PENDING'
                                ? ''
                                : item?.status === 'WON'
                                ? `₹ ${Number(item?.payoutAmount).toFixed(2)}`
                                : `₹ ${Number(item?.betAmount).toFixed(2)}`}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-white my-4">
                        {t('NO_DATA')}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          <Pagination
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            pageValue={pageValue}
            totalPages={totalPages}
          />
        </div>
      </div>
    </section>
  );
};

GameHistory.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func.isRequired,
  // fetchBetHistory: PropTypes.func.isRequired,
  lines: PropTypes.any,
  betHistoryData: PropTypes.any,
  setPageValue: PropTypes.any,
  isFetching: PropTypes.any,
  gameHistoryData: PropTypes.any,
  handleNextPage: PropTypes.any,
  handlePrevPage: PropTypes.any,
  pageValue: PropTypes.any,
  totalPages: PropTypes.any,
};

export default GameHistory;
