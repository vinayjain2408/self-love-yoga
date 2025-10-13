import HomeSlider from '@/components/Slider/HomeSlider';
import { getReq } from '@/utils/apiHandlers';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDemoLogin from '@/hooks/useDemoLogin';
import { Loading } from '@/components';
import LocalContext from '../../contexts/LocaleContext';
import Card from '@/components/Card';
import AboutUsDetail from '@/components/AboutUsDetail/Page';
import Testimonials from '@/components/Testimonials/page';
import Footer from '@/components/Footer';
import WhyChooseUs from '@/components/WhyChooseUs';

const cardsData = [
  {
    image: '/images/card1.jpeg',
    title: 'Morning Yoga Routine',
    description: 'Start your day with a fresh yoga flow to energize your body.',
  },
  {
    image: '/images/card2.jpeg',
    title: 'Power Yoga',
    description: 'Boost your stamina and strength with power yoga sessions.',
  },
  {
    image: '/images/card7.jpeg',
    title: 'Meditation Basics',
    description:
      'Learn how to calm your mind with simple meditation techniques.',
  },
  {
    image: '/images/card4.jpeg',
    title: 'Healthy Diet',
    description: 'Combine yoga with the right diet for better results.',
  },
  {
    image: '/images/card3.jpeg',
    title: 'Corporate Yoga',
    description: 'Relieve stress and back pain with targeted yoga poses.',
  },
  {
    image: '/images/card6.jpeg',
    title: 'Evening Relaxation',
    description: 'End your day with gentle stretches and relaxation yoga.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { LOCALE } = useContext(LocalContext);
  const [banner, setBanner] = useState([]);
  const { handleDemoLogin, loading } = useDemoLogin();
  const [isLoading, setIsLoading] = useState(false);

  const bannerPoster = async () => {
    try {
      setIsLoading(true);
      const res = await getReq('/banners');
      if (res?.status) {
        setBanner(res?.data?.data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    bannerPoster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="pb-10">
        {/* Header */}
        <nav className="bg-[#011030] fixed -top-1 left-0 right-0 z-50  mx-auto">
          <div className="shadow-custom flex  items-center justify-between p-4">
            <div className="w-[140px] ">
              <h2 className="font-poppins  font-semibold text-26  leading-[38px]">
                LOGO
              </h2>
              {/* <img
                src={`/images/Home/gamelogo.png`}
                // src={`${process.env.IMAGE_KIT}/images/Home/gamelogo.png`}
                className="w-full"
              /> */}
            </div>

            <div className="flex items-center gap-2 pl-4 py-2">
              <button
                onClick={handleDemoLogin}
                className="rounded-lg py-1.5 px-3 text-12 md:text-16 border font-poppins font-semibold leading-5 border-yellow-300 transition "
              >
                Home
              </button>

              <button
                className="rounded-lg font-poppins font-semibold leading-5 py-1.5 px-3 text-12 md:text-16 bg-custom-gradient text-black transition "
                onClick={() => navigate(LOCALE + '/aboutus')}
              >
                About Us
              </button>
              <button
                className="rounded-lg font-poppins font-semibold leading-5 py-1.5 px-3 text-12 md:text-16 bg-custom-gradient text-black transition "
                onClick={() => navigate(LOCALE + '/contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section  */}
        <section className="bg-[#f5f7ff] py-16 px-6 md:px-12 mt-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-4xl font-bold text-gray-900 leading-tight">
                Personal Yoga Classes at <br />
                home,
                <br />
                <span className="text-blue-700">
                  Guided by Highly Experienced & Certified Trainers
                </span>
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Discover the benefits of yoga from the comfort of your home. Our
                live and on-demand sessions are designed for all levels—whether
                you’re a beginner or advanced practitioner. Build strength,
                improve flexibility, and find inner peace with expert guidance
                every step of the way.
              </p>
              <button className="mt-6 px-6 py-3 rounded-full bg-blue-800 text-white font-semibold hover:bg-blue-900 transition">
                Start Your Free Trial Today
              </button>
            </div>

            {/* Right Content */}
            <div className="relative flex justify-center md:justify-end">
              {/* Yoga Image */}
              <img
                src="/images/yoga1.jpg"
                alt="Yoga Pose"
                className="rounded-lg w-full object-cover"
              />

              {/* Trainer Card */}
              {/* <div className="absolute bottom-6 left-6 bg-white shadow-lg rounded-xl p-4 w-72">
                <div className="flex items-center gap-4">
                  <img
                    src="/images/trainer.jpg"
                    alt="Trainer"
                    className="w-12 h-12 rounded-full border"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm text-right text-blue-700 font-bold">
                      5/5
                    </h3>
                    <h2 className="font-semibold text-gray-800">
                      Manish Mittal
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Yoga Therapist & Consultant
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-gray-500 text-sm">
                  15 Years Experience
                </p>
                <a
                  href="#"
                  className="mt-2 inline-block text-blue-700 font-semibold text-sm hover:underline"
                >
                  VIEW FULL PROFILE
                </a>
              </div> */}
            </div>
          </div>
        </section>

        {/* Yoga vaas */}
        <section className="pt-8 px-[12px]">
          <div className="rounded-lg text-scroll bg-custom-gradient mt-3">
            {/* {reactIcons.apple} */}
            {/* {text && (
              <div className="rounded-lg">
                <div className="rounded-10 gradient-bg">
                  <marquee className="text-14 font-poppins  text-center font-semibold leading-[18px] text-black">
                    <span className="flex items-center gap-2  ">
                      <img
                        src={`/images/home/homemusic.png`}
                        className="w-5 h-5 mt-2"
                      />
                      <h1 className=" mt-2 "> {t('HOME_HEADING')}</h1>
                    </span>
                  </marquee>
                </div>
              </div>
            )} */}
          </div>
          <h1 className="text-center text-3xl my-6">Yoga vaas</h1>
          <div className="relative">
            <HomeSlider banner={banner} />
          </div>
        </section>
      </div>

      <WhyChooseUs />

      <h1 className="text-center text-26 my-6">Our Services</h1>
      <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      <AboutUsDetail />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
