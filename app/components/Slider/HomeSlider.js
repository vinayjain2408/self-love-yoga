import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import PropTypes from 'prop-types';

export default function HomeSlider() {
  const defaultImages = [
    '/images/image1.jpeg',
    '/images/image2.jpeg',
    '/images/image3.jpeg',
    '/images/image4.jpeg',
    '/images/image5.jpeg',
    '/images/image6.jpeg',
    '/images/image7.jpeg',
  ];
  return (
    <div className="gap-2 mx-auto overflow-hidden m-4">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // allowTouchMove={true}
      >
        {defaultImages?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <img
                src={item}
                alt={`Banner ${index + 1}`}
                className="w-full h-[300px] rounded-lg shadow-lg object-fill"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

HomeSlider.propTypes = {
  banner: PropTypes.array.isRequired,
};
