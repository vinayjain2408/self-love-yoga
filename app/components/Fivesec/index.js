import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Fivesec = ({ timer }) => {
  const selectedType = localStorage.getItem('selectedTimeSession');
  const time =
    selectedType === '30-seconds'
      ? timer?.['30sec']
      : selectedType === '1-minute'
      ? timer?.['1min']
      : timer?.['3min'];

  const [isTabVisible, setIsTabVisible] = useState(
    document.visibilityState === 'visible',
  );

  const ref = useRef({
    isPlayed: false,
    time: null,
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document?.visibilityState === 'visible');
    };

    document?.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document?.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const formatTime = (seconds) => {
    const secs = Math?.floor(seconds % 60);
    if (ref?.current?.time !== secs) {
      ref.current.time = secs;
      ref.current.isPlayed = false;
    }

    if (secs <= 5 && secs > 0 && !ref?.current?.isPlayed && isTabVisible) {
      ref.current.isPlayed = true;
      const audio = new Audio('/images/sound/beep.mp3');
      audio.volume = 1;
      audio.play().catch((error) => console.error('Audio play failed:', error));
    }

    return secs.toString();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative w-[320px] rounded-3xl overflow-hidden">
        <span className="bg-[#666462] flex items-center justify-center w-[30%] mx-auto h-[150px] rounded-xl">
          <span className="flex items-center justify-center font-poppins text-9xl font-bold text-transparent bg-clip-text bg-custom-text">
            {formatTime(time)}
          </span>
        </span>
      </div>
    </div>
  );
};

Fivesec.propTypes = {
  showResult: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['win', 'lose']),
  amount: PropTypes.string,
  timer: PropTypes.number,
};

export default Fivesec;
