import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import PropTypes from 'prop-types';

export default function HomeSlider() {
  // Image + Name list
  const slides = [
    { src: '/images/image1.jpeg', name: 'Morning Flow Yoga' },
    { src: '/images/image2.jpeg', name: 'Power Yoga Session' },
    { src: '/images/image3.jpeg', name: 'Meditation Practice' },
    { src: '/images/image4.jpeg', name: 'Yoga for Flexibility' },
    { src: '/images/image5.jpeg', name: 'Relaxation & Healing' },
    { src: '/images/image6.jpeg', name: 'Strength Building Yoga' },
    { src: '/images/image7.jpeg', name: 'Balance & Focus Yoga' },
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
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center">
              <img
                src={item.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-[300px] rounded-lg shadow-lg object-cover"
              />
              <h2 className="text-lg font-semibold mt-2 text-white">
                {item.name}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

HomeSlider.propTypes = {
  banner: PropTypes.array,
};
