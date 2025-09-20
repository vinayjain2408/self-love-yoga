import React, { useState, useEffect, useContext } from 'react';
// import { TopBar } from '@/components';
import Footer from '@/components/Footer';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { reactIcons } from '@/utils/icon';
import { useNavigate } from 'react-router-dom';
import { LocaleContext } from '@/contexts';
// import { useNavigate } from 'react-router-dom';
// import LocalContext from '../../contexts/LocaleContext';

const Language = () => {
  const [selected, setSelected] = useState(i18n.language);
  console.log('i18n.language', i18n.language);
  const { t } = useTranslation();
  const { LOCALE } = useContext(LocaleContext);
  const navigate = useNavigate();
  const languages = [
    {
      lang: 'en',
      label: 'English',
      image: `${process.env.IMAGE_KIT}/images/eng-flag.png`,
    },
    {
      lang: 'hi',
      label: 'हिन्दी',
      image: `${process.env.IMAGE_KIT}/images/hindi-flag.png`,
    },
  ];

  useEffect(() => {
    setSelected(i18n.language);
  }, [selected]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setSelected(lang);
    // navigate(LOCALE + '/profile');
  };

  return (
    <>
      <div className="px-4">
        {/* <TopBar heading={t('LANGUAGE')} /> */}
        <div className="mb-2   ">
          <nav className="grid grid-cols-6 py-2 mt-4 w-full   md:mx-auto  ">
            <div className="col-span-1">
              <div className="flex items-center   border-[#CAE0E8] ">
                <div
                  onClick={() => navigate(LOCALE + '/profile')}
                  className="h-8 w-8 p-2 flex justify-center items-center bg-custom-gradient text-xl text-black rounded-lg font-bold cursor-pointer"
                >
                  {reactIcons.backarrow}
                </div>
              </div>
            </div>
            <h2 className="font-poppins col-span-4 text-white text-20 leading-[30px] font-semibold text-center">
              {t('LANGUAGE')}
            </h2>
          </nav>
        </div>
        <section>
          <div className="flex flex-col items-center mt-10 ">
            <div className="w-full max-w-sm">
              {languages.map((data) => (
                <div
                  key={data.lang}
                  className="flex justify-between items-center w-full p-4 my-3 bg-white rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleLanguageChange(data.lang)}
                >
                  <div className="flex gap-1 items-center">
                    <img src={data.image} alt={data.label} />
                    <span className="text-[#344054] font-poppins font-normal text-14 leading-[20px]">
                      {data.label}
                    </span>
                  </div>

                  <div
                    className={`w-6 h-6 border-2 border-yellow-500 rounded-full flex items-center justify-center `}
                  >
                    {selected === data.lang && (
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Language;
