import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const HowToPlayModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const gameType = localStorage?.getItem('selectedTimeSession');
  return (
    <>
      {/* Modal Component */}
      <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50  backdrop-blur-sm">
        <div className="w-[320px] max-w-[430px] mx-auto">
          <div className="font-[700] text-center py-[12px] w-full rounded-t-[18px] text-black bg-gradient-to-l from-[#DFB11E] via-[#FEF888] to-[#F0CF4E]">
            {t('HOW_TO_PLAY')}
          </div>
          <div className="max-h-[345px] font-[500] overflow-y-scroll bg-[#201D2B] p-[10px]">
            {gameType === '30-seconds' ? (
              <div className="">
                <div className=" font-poppins    text-white  text-sm">
                  <p>{t('RULE30SEC1')}</p>
                  <p>{t('RULE30SEC2')}</p>
                  <br />
                  <p>{t('RULE30SEC3')}</p>
                  <br />
                  <p>{t('RULE30SEC4')}</p>
                  <br />
                  <p>{t('RULE30SEC5')}</p>
                  <br />
                  <p>{t('RULE30SEC6')}</p>
                  <p>{t('RULE30SEC7')}</p>
                  <p>{t('RULE30SEC8')}</p>
                  <p>{t('RULE30SEC9')}</p>
                </div>
              </div>
            ) : gameType === '1-minute' ? (
              <div className="">
                <div className=" font-poppins  text-white pb-[4rem] text-sm">
                  <p>{t('RULE1MIN1')}</p>
                  <br />
                  <p>{t('RULE1MIN2')}</p>
                  <br />
                  <p>{t('RULE1MIN3')}</p>
                  <br />
                  <p>{t('RULE1MIN13')}</p>
                  <br />
                  <p>{t('RULE1MIN4')}</p>
                  <br />
                  <p>{t('RULE1MIN5')}</p>
                  <br />
                  <p>{t('RULE1MIN6')}</p>
                  <br />
                  <p>{t('RULE1MIN7')}</p>
                  <br />
                  <p>{t('RULE1MIN8')}</p>
                  <br />
                  <p>{t('RULE1MIN9')}</p>
                  <br />
                  <p>{t('RULE1MIN10')}</p>
                  <br />
                  <p>{t('GAME_RULES1')}</p>
                  <p>{t('RULE1MIN11')}</p>
                  <p>{t('RULE1MIN12')}</p>
                  <br />
                  <p>{t('NO_MORE1')}</p>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="font-poppins  text-white pb-[4rem] text-sm">
                  <p>{t('RULE1')}</p>
                  <br />
                  <p>{t('RULE2')}</p>
                  <br />
                  <p>1. {t('RULE3')}</p>
                  <br />
                  <p>2. {t('RULE4')}</p>
                  <br />
                  <p>3. {t('RULE5')}</p>
                  <br />
                  <p>4. {t('RULE6')}</p>
                  <br />
                  <p>5. {t('RULE7')}</p>
                  <br />
                  <p>6. {t('RULE8')}</p>
                </div>
              </div>
            )}
          </div>
          <div
            onClick={closeModal}
            className="font-[500] rounded-b-[18px] text-center py-[12px] w-full  text-black bg-gradient-to-l from-[#DFB11E] via-[#FEF888] to-[#F0CF4E]"
          >
            {t('CLOSE')}
          </div>
        </div>
      </div>

      {/* Close Button Outside the Modal */}
      {/* {openModal && (
        <button
          onClick={closeModal}
          style={{
            background: 'transparent',
            border: 'none',
            height: '40px',
            width: '40px',
            fontSize: '20px',
            borderRadius: '100%',
            backgroundImage:
              'linear-gradient(270deg, #DFB11E 0%, #FEF888 45%, #F0CF4E 100%)',
            color: 'black',
            fontWeight: '700',
            cursor: 'pointer',
            zIndex: 1000,
          }}
          className="fixed lg:top-[20%] top-[10%] right-[48%]"
        >
          X
        </button>
      )} */}
    </>
  );
};

HowToPlayModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default HowToPlayModal;
