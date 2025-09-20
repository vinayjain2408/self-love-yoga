import React from 'react';
import { useTranslation } from 'react-i18next';

const domains = [
  'winoracolor.com',
  'winorapower.com',
  'winora.com',
  'winoracomplete.com',
  'winorabetty.com',
  'winoraoriginal.com',
];
const Activity = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center bg-[#333332] min-h-screen">
      <div className="w-full max-w-md bg-gray-100 shadow-md">
        <div className="flex flex-col items-center bg-[#242424] text-white pb-8">
          <div className="py-6 text-center">
            <h2 className="text-yellow-400 text-2xl font-bold mb-1">WINORA</h2>
          </div>
          <div className="px-6 mb-6 text-base">
            <p className="text-yellow-400 mb-1 text-lg border-b-2 border-[#B9B6B6]">
              {t('WELCOME_TO_WINORA')}
            </p>
            <p className="text-yellow-400 mt-1">
              {t('WINORA_COLLECTION_NOTE')}
            </p>
          </div>
          <div className="mb-3">
            <input
              placeholder={t('VERIFY') + ' WINGO URL...'}
              className=" px-4 py-2 rounded-2xl text-12"
            />
            <button className="bg-[#EDC100] ml-2 text-12 px-3 py-2 rounded-xl">
              {t('VERIFY')}
            </button>
          </div>

          <div>
            {domains?.map((domain, index) => (
              <div
                key={index}
                className="flex items-center bg-[#1E1E1E] px-2 py-1 rounded-full w-fit"
              >
                {/* Response Time */}
                <div className="bg-[#EDC100] text-sm font-semibold pl-3 pr-6 py-2 rounded-l-full text-white">
                  8ms
                </div>

                {/* Domain Input */}
                <input
                  type="text"
                  value={domain}
                  readOnly
                  className="bg-white text-black text-sm font-medium pl-2 pr-7 py-2 mr-2 rounded-r-full border-none outline-none w-[175px] md:w-[200px]"
                />

                {/* Visit Button */}
                <button className="flex items-center bg-[#EDC100] pl-1 pr-3 py-2 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-gray-700 p-1 flex items-center justify-center">
                    {/* <div className="w-3 h-3 border-t-2 border-r-2 border-white transform rotate-45"></div> */}
                    <img src="/images/Vector.png" className="h-full" />
                  </div>
                  <span className="text-red-600 font-bold text-xl ml-1">
                    {t('VISIT')}
                  </span>
                </button>
              </div>
            ))}
          </div>
          <div className="bg-black w-full m-1 h-[290px] rounded-xl my-4"></div>

          {/* Information Box */}
          <div className="w-full px-6 mb-8 ">
            <div className="bg-yellow-500 text-black p-3 rounded-lg text-center text-sm border-4 border-red-500">
              <div className="bg-red-600 text-white py-1 px-2 rounded-full text-xs font-bold mb-2">
                {t('WHY_CHOOSE_WINORA')}
              </div>
              <p className="mb-4 text-14 font-bold">{t('PLATFORM_HISTORY')}</p>
              <div className="bg-red-600 text-white py-1 px-2 rounded-full text-xs font-bold mb-2">
                {t('WHY_BECOME_AGENT')}
              </div>
              <p className="text-14 font-bold">{t('PLATFORM_HISTORY')}</p>
            </div>
          </div>

          <div className="w-full px-6 mb-8">
            <div className="bg-yellow-500 text-white p-3 rounded-lg border-4 border-red-500">
              <div className="mt-[-1.5rem] text-center mb-4">
                <span className="bg-red-600 text-white py-2 px-3 rounded-full text-xs font-bold mb-2 text-center">
                  {t('HOW_TO_REGISTER_AGENT')}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="bg-[#353535] h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p className="font-bold text-14 text-[#353535]">
                    {t('STEP_SELECT_PROMOTION')}
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-[#353535] h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p className="font-bold text-14 text-[#353535]">
                    {t('STEP_SELECT_INVITATION_LINK')}
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-[#353535] h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p className="font-bold text-14 text-[#353535]">
                    {t('STEP_COPY_INVITATION_LINK')}
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-[#353535] h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold ">4</span>
                  </div>
                  <p className="font-bold text-14 text-[#353535]">
                    {t('STEP_USE_LINK_TO_INVITE')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-6 mb-8">
            <div className="bg-yellow-500 text-white py-4 rounded-lg border-4 border-red-500">
              <span className="bg-red-600 text-white py-3 pr-6 px-2 pl-12 rounded-r-full text-16 font-bold mb-2">
                {t('PAYMENT_METHODS')}
              </span>
              <div className="grid grid-cols-3 gap-3 mt-4 px-3">
                <div className="bg-white p-2 rounded-md flex items-center justify-center">
                  <img src="/images/payment1.png" alt="UPI image" />
                </div>
                <div className="bg-white p-2 rounded-md flex items-center justify-center">
                  <img src="/images/payment2.png" alt="UPI image" />
                </div>
                <div className="bg-white p-2 rounded-md flex items-center justify-center">
                  <img src="/images/payment3.png" alt="UPI image" />
                </div>
                <div className="bg-white p-2 rounded-md flex items-center justify-center">
                  <img src="/images/payment4.png" alt="UPI image" />
                </div>
                <div className="bg-white p-2 rounded-md flex items-center justify-center">
                  <img src="/images/payment5.png" alt="UPI image" />
                </div>
                <div className="bg-white rounded-md flex items-center justify-center">
                  <img src="/images/payment6.png" alt="UPI image" width={65} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
