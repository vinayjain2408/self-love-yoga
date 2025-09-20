import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, SwipeableDrawer, Box } from '@mui/material';
import Modal from '../Modal';
import { postAuthReq } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const colorMapping = {
  green: 'linear-gradient(180deg, #005E3A 0%, #054130 100%)',
  red: 'linear-gradient(180deg, #A40100 0%, #680E07 100%)',
  violet: 'linear-gradient(180deg, #8602EB 0%, #50028B 100%)',
  big: 'linear-gradient(180deg, #FF69B4 0%, #f72093 100%)',
  small: 'linear-gradient(180deg, #25D7FF 0%, #01748E 100%)',
  2: 'linear-gradient(180deg, #A40100 0%, #680E07 100%)',
  4: 'linear-gradient(180deg, #A40100 0%, #680E07 100%)',
  6: 'linear-gradient(180deg, #A40100 0%, #680E07 100%)',
  8: 'linear-gradient(180deg, #A40100 0%, #680E07 100%)',
  3: 'linear-gradient(180deg, #005E3A 0%, #008D57 100%)',
  7: 'linear-gradient(180deg, #005E3A 0%, #008D57 100%)',
  9: 'linear-gradient(180deg, #005E3A 0%, #008D57 100%)',
  1: 'linear-gradient(180deg, #005E3A 0%, #008D57 100%)',
  5: 'linear-gradient(90deg, #005E3A 50%, #8602EB 50%)',
  0: 'linear-gradient(90deg,#A40100 50%,  #8602EB  50%)',
};

const BettingModal = ({
  selectedOption,
  totalAmount,
  onCancel,
  isOpen,
  poolData,
  gameType,
  GetWalletBalance,
  setAmount,
  fetchBetHistory,
  selectedType,
  multiplier,
  setMultiplier,
  gamePause,
}) => {
  const { t } = useTranslation();
  const data = localStorage?.getItem('selectedTimeSession');
  const userId = useSelector((state) => state.userData.user?.id);
  const [agreed, setAgreed] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const poolMapping = {
    '30-seconds': '30sec',
    '1-minute': '1min',
    '3-minute': '3min',
  };

  const selectedPoolData = poolMapping[data]
    ? poolData[poolMapping[data]]
    : null;

  useEffect(() => {
    const savedAgreed = localStorage?.getItem('betting_agreed');
    if (savedAgreed === 'true') {
      setAgreed(true);
    }
  }, []);

  const handleAgreementChange = (e) => {
    const isChecked = e?.target?.checked;
    setAgreed(isChecked);
    localStorage?.setItem('betting_agreed', isChecked ? 'true' : 'false');
  };

  const handleQuantityChange = (value) => {
    if (multiplier + value >= 1) {
      setMultiplier(multiplier + value);
    }
  };

  const handleMultiplierChange = (value) => {
    setMultiplier(value);
  };

  const backgroundColor = colorMapping[selectedOption] || '';

  const handleSubmit = async () => {
    toast?.dismiss();
    if (isSubmitting) return;
    if (!agreed) {
      setIsSubmitting(true);
      toast.error('Please agree to the Pre-sale rules.');
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      return;
    }

    setIsSubmitting(true);

    const valueBet = totalAmount * multiplier;

    try {
      const payload = {
        userId: userId,
        poolId: selectedPoolData?.poolId,
        gameType: gameType,
        selectedValue: selectedOption,
        betAmount: valueBet,
        gameName: 'Color Prediction',
      };
      const response = await postAuthReq(
        `/bet/place?userId=${userId}`,
        payload,
      );
      if (response?.data?.status === 'success') {
        const poolId = response?.data?.data?.poolId;
        if (selectedPoolData?.poolType === '30-seconds') {
          sessionStorage?.setItem('poolID-30', poolId);
        }
        if (selectedPoolData?.poolType === '1-minute') {
          sessionStorage?.setItem('poolID-60', poolId);
        }
        if (selectedPoolData?.poolType === '3-minute') {
          sessionStorage?.setItem('poolID-180', poolId);
        }

        toast?.success('Bet placed successfully!');

        onCancel();
        setAmount(1);
        setMultiplier(1);
        GetWalletBalance();
        fetchBetHistory();
        // setTimeout(() => {
        //   fetchBetHistory();
        //   GetWalletBalance();
        // }, 3000);
      } else {
        toast.error(response?.error?.message || 'Something went wrong.');
        gamePause();
      }
    } catch (error) {
      console.error('Error submitting bet:', error);
      toast.error('Failed to place bet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onClose={() => {
        onCancel();
        setAmount(1);
        setMultiplier(1);
        setIsRulesModalOpen(false);
      }}
      onOpen={() => {}}
      // className="!bg-transparent"
    >
      <Box
        sx={{
          background: backgroundColor,
          color: '#fff',
          textAlign: 'center',
          borderRadius: '20px 20px 0 0',
        }}
        className="bg-transparent md:mx-auto"
      >
        <div className="pb-4">
          <h3 className="font-montserrat text-20 leading-6 font-bold py-4">
            Win Go {selectedType}
          </h3>
          <p className="bg-white w-[50%] text-black flex justify-center mx-auto rounded-[6px]">
            <span className="pr-2"> {t('SELECT_OPTION')}</span>
            {selectedOption === 'red'
              ? t('RED')
              : selectedOption === 'green'
              ? t('GREEN')
              : selectedOption === 'violet'
              ? t('VOILET')
              : selectedOption === 'big'
              ? t('BIG')
              : selectedOption === 'small'
              ? t('SMALL')
              : selectedOption}
          </p>
        </div>

        <div className="bg-[#201D2B] px-3 py-4">
          <div className="flex justify-between gap-4 items-center">
            <label className="font-montserrat text-16 font-medium leading-[19.5px]">
              {t('BALANCE')}
            </label>
            <div className="flex gap-[10px]">
              {[1, 10, 100, 1000].map((amount) => (
                <button
                  key={amount}
                  className={`flex-1 m-[1px] px-2 py-1 text-12 font-semibold rounded 
    ${
      amount === totalAmount
        ? 'bg-blue-600 text-white'
        : 'bg-white text-black border border-gray-300'
    }
  `}
                  style={{
                    background:
                      amount === totalAmount ? backgroundColor : '#ffffff',
                    color: amount === totalAmount ? '#ffffff' : '#000000',
                  }}
                  onClick={() => setAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <label className="font-montserrat text-16 font-medium leading-[19.5px]">
              {t('QUANTITY')}
            </label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <button
                className="px-2 py-1 text-white font-semibold rounded"
                style={{ background: backgroundColor }}
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>

              <span
                style={{
                  margin: '0 10px',
                  border: '1px solid #fff',
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '0 6px',
                  width: '72px',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: 'black',
                }}
                className="flex justify-center py-1 font-medium"
              >
                {multiplier}
              </span>

              <button
                className="px-2 py-1 text-white font-semibold rounded"
                style={{ background: backgroundColor }}
                onClick={() => handleQuantityChange(+1)}
              >
                +
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: '',
              justifyContent: 'end',
            }}
            className="mx-auto md:w-[430px]"
          >
            {[1, 5, 10, 20, 50, 100].map((multi) => (
              <button
                key={multi}
                className={`m-[5px] px-2 py-1 text-[12px] font-[600] rounded 
    ${multi === multiplier ? 'text-white' : 'text-black border border-gray-300'}
  `}
                style={{
                  background: multi === multiplier ? backgroundColor : 'white',
                  minWidth: '40px',
                  fontFamily: 'Poppins, sans-serif',
                }}
                onClick={() => handleMultiplierChange(multi)}
              >
                X{multi}
              </button>
            ))}
          </div>
          <div className="flex items-center text-12">
            <input
              type="checkbox"
              checked={agreed}
              onChange={handleAgreementChange}
              className="w-5 h-5  bg-transparent border border-white rounded-md cursor-pointer"
            />

            <label className="ml-3">
              {t('AGREE')}
              <button
                onClick={() => setIsRulesModalOpen(true)}
                className="text-red-700 underline ml-1"
              >
                {t('PRE_SALE_RULES')}
              </button>
            </label>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '',
            height: '50px',
          }}
        >
          <Button
            variant="contained"
            onClick={onCancel}
            className={`w-40% w-1/3 ${
              multiplier === 1 ? 'text-black' : 'text-white'
            } text-16 font-poppins leading-[24px] font-normal`}
            style={{ backgroundColor: '#3F3F3F' }}
          >
            {t('CANCEL')}
          </Button>
          <Button
            variant="outlined"
            style={{
              color: multiplier === 1 ? 'white' : 'white',
            }}
            className={`w-60% w-full ${
              multiplier === 1 ? 'text-white' : 'text-white'
            } text-16 font-poppins leading-[24px] font-medium rounded-lg`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {t('TOTAL_AMOUNT')} <span className="text-20 ml-1">₹</span>
            {/* {totalAmount * multiplier} */}
            {Number(totalAmount * multiplier).toLocaleString('en-IN', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Button>
        </div>
      </Box>

      <Modal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
        title={t('PRE_SALE_RULES')}
        content={
          <ul className="font-poppins text-black text-14 leading-[21px] text-start">
            <li>{t('PRE_SALE_RULES1')}</li>
            <li>{t('PRE_SALE_RULES2')}</li>
            <li>{t('PRE_SALE_RULES3')}</li>
            <li>{t('PRE_SALE_RULES4')}</li>
            <li>{t('PRE_SALE_RULES5')}</li>
            <li>{t('PRE_SALE_RULES6')}</li>
            <li>{t('PRE_SALE_RULES7')}</li>
          </ul>
        }
        buttonText={t('I_KNOW')}
      />
    </SwipeableDrawer>
  );
};

BettingModal.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  selectedType: PropTypes.string.isRequired,
  gameType: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  poolData: PropTypes.number.isRequired,
  GetWalletBalance: PropTypes.func.isRequired,
  fetchBetHistory: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  multiplier: PropTypes.func.isRequired,
  setMultiplier: PropTypes.func.isRequired,
  gamePause: PropTypes.func.isRequired,
};

export default BettingModal;
