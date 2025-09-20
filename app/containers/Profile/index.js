import BackButton from '@/components/BackButton';
// import CustomButton from '@/components/CustomButton';
import Footer from '@/components/Footer';
import ModalLayout from '@/components/ModalLayout';
import ModalPopup from '@/components/ModalPopup';
import { isLoggedIn, patchAuthReq, postAuthReq } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icon';
import { getProfileNameValidation } from '@/utils/validation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LocalContext from '../../contexts/LocaleContext';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/redux/slice/userSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { LOCALE } = useContext(LocalContext);
  const i18nextLng = localStorage.getItem('i18nextLng');
  const isLogin = isLoggedIn();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [user, setUser] = useState({});
  const { user, status } = useSelector((state) => state.userData);
  const demoUser = Cookies.get('isDemoUser');

  const handleChangeUsername = async (values) => {
    const { username } = values;
    if (!username.trim()) {
      toast.error('Username cannot be empty');
      return;
    }
    try {
      setIsLoading(true);
      const payload = { username };
      const response = await patchAuthReq('/users/me', payload);

      if (response?.status) {
        // setUser((prevUser) => ({ ...prevUser, username }));
        dispatch(getUser());
        toast.success('Name changed successfully');
        setOpenModal(false);
      } else {
        if (response?.error) {
          if (typeof response.error === 'object') {
            Object.values(response.error)
              .filter(
                (msg) => isNaN(msg) && !/unauthorized|error|failed/i.test(msg),
              )
              .forEach((error) => {
                toast.error(error);
              });
          } else {
            toast.error(response.error);
          }
        } else {
          toast.error('Name change failed. Please try again.');
        }
      }
    } catch (error) {
      console.log('Error updating username:', error);
      toast.error('An unexpected error occurred.');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }
  };

  const handleUploaded = async (uploadedImageData) => {
    if (!uploadedImageData?.filename) {
      console.error('No image filename available');
      return;
    }
    const payLoad = {
      profileImage: uploadedImageData.filename,
    };
    try {
      setLoadingImage(true);
      const res = await postAuthReq('/users/me/profile-image', payLoad);
      if (res?.status) {
        setLoadingImage(false);
        setProfileImage(res.data.profileImage);
        dispatch(getUser());
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validImageTypes.includes(file?.type)) {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        const image = await postAuthReq('/upload', data);
        if (image?.status) {
          handleUploaded(image?.data.meta);
          // setUser({ ...user, profileImage: image?.data?.url });
        } else {
          toast.error(image?.data || 'Something went wrong!');
        }
      } else {
        toast.error(
          'Invalid file type. Please select a JPEG, PNG, or JPG image.',
        );
      }
    }
  };

  const handleCopyText = (text) => {
    toast.dismiss();
    if (!text) {
      toast.error('Nothing to copy!');
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy!'));
  };

  return (
    <>
      <div className="  container-none z-30 relative rounded-lg  text-black ">
        <div className="absolute  w-full inset-0 -z-10">
          <img
            src={`${process.env.IMAGE_KIT}/images/profilebg.svg`}
            alt=""
            className="w-full 
            object-cover rounded-lg"
          />
        </div>

        <div className="flex  py-2 px-4 pt-4 justify-between items-start">
          <BackButton
            className="p-2 rounded-full !bg-white bg-opacity-30 text-black"
            heading={''}
          />
          {/* <div
            onClick={() => navigate('')}
            className=" bg-white px-3 py-1 flex items-center gap-2 rounded-lg"
          >
            <img src="/images/profileicon.svg" alt="" />
            <span className="font-poppins font-semibold text-14 leading-[21px]">
              KYC
            </span>
          </div> */}
        </div>

        <div className="relative flex  gap-4 px-4 bottom-[-22px] mt-[10px] lg:mt-[30px]">
          {/* <div className="w-[120px] h-[120px] relative rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xl"> */}

          <div className="w-[120px] h-[120px] relative rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xl">
            {loadingImage && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-full">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {status === 'loading' ? (
              <Skeleton circle height={120} width={120} />
            ) : (
              <img
                src={
                  (profileImage
                    ? profileImage
                    : user?.profileImage && user?.profileImage) ||
                  `${process.env.IMAGE_KIT}/images/placeholder.jpg`
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `${process.env.IMAGE_KIT}/images/placeholder.jpg`;
                }}
              />
            )}

            <input
              type="file"
              className="hidden"
              id="inputfile"
              onChange={handleFileChange}
            />
            {demoUser ? (
              ''
            ) : (
              <label
                htmlFor="inputfile"
                className="absolute bottom-[0.75rem] -right-2"
              >
                <img
                  src={`${process.env.IMAGE_KIT}/images/editicon.svg`}
                  alt="Edit"
                />
              </label>
            )}
          </div>
          <div className="text-white">
            <h2 className="font-poppins font-semibold text-20 leading-[30px]">
              {status === 'loading' ? (
                <Skeleton width={160} height={24} />
              ) : (
                user?.username || user?.email?.split('@')[0]
              )}
            </h2>
            {/* <p className="text-16 flex items-center gap-1 font-poppins font-normal leading-[20px] whitespace-nowrap">
              UID | {user?.id || '-'}{' '}
              {demoUser ? (
                ''
              ) : (
                <span onClick={() => handleCopyText(user?.id)}>
                  {reactIcons.copy}
                </span>
              )}
            </p> */}
            <p className="text-16 flex items-center gap-1 font-poppins font-normal leading-[20px] whitespace-nowrap">
              UID |{' '}
              {status === 'loading' ? (
                <Skeleton width={100} height={20} />
              ) : (
                <>
                  {user?.id || '-'}
                  {!demoUser && (
                    <span onClick={() => handleCopyText(user?.id)}>
                      {reactIcons.copy}
                    </span>
                  )}
                </>
              )}
            </p>

            {/* <p className="text-12 leading-[20px] font-poppins mt-1">
              Last login: {user?.updatedAt || 'N/A'} 
              {t('LAST_LOGIN')}
              {new Date(user?.updatedAt).toLocaleString() || '-'}
            </p> */}
            <p className="text-[12px] leading-[20px] font-poppins mt-1">
              {t('CREATED_AT')} -{' '}
              {status === 'loading' ? (
                <Skeleton width={120} height={16} />
              ) : user?.createdAt ? (
                new Date(user?.createdAt).toLocaleString()
              ) : (
                '-'
              )}
            </p>
          </div>
        </div>
      </div>
      <div className=" py-2 mt-12">
        <div className="bg-custom-gradient  rounded-lg py-2 text-black ">
          <h2 className="font-poppins  font-semibold py- pb-3 text-16 leading-[20px]  border-b border-black ">
            <span className="px-4"> {t('PROFILE_HEADING')}</span>
          </h2>

          <div className="flex  mt-1 py-1 justify-between items-center px-4">
            <p className="font-poppins font-medium text-16 leading-[24px]">
              {t('USERNAME')}
            </p>
            {/* <p className="flex gap-2 font-poppins font-normal text-16 leading-[24px]">
              {user?.username ? user.username : user?.email?.split('@')[0]}
              {demoUser ? (
                ''
              ) : (
                <button onClick={() => setOpenModal(true)}>
                  {reactIcons.edit}
                </button>
              )}
            </p> */}
            <p className="flex gap-2 font-poppins font-normal text-16 leading-[24px]">
              {status === 'loading' ? (
                <Skeleton width={150} height={20} />
              ) : (
                <>
                  {user?.username || user?.email?.split('@')[0]}
                  {!demoUser && (
                    <button onClick={() => setOpenModal(true)}>
                      {reactIcons.edit}
                    </button>
                  )}
                </>
              )}
            </p>

            <ModalLayout
              open={openModal}
              onClose={() => setOpenModal(false)}
              title={t('EDIT_USER')}
              titleBgColor="bg-custom-gradient"
              actions={
                <button
                  type="submit"
                  form="usernameForm"
                  className="w-full bg-custom-gradient text-black py-2 rounded font-semibold"
                  disabled={isLoading}
                >
                  {t('CONTIRMS')}
                </button>
              }
            >
              <div className="px-2 py-3">
                <label className="flex items-center gap-2 text-white mb-2">
                  <img
                    src={`${process.env.IMAGE_KIT}/images/changename.svg`}
                    alt=""
                  />
                  <span>{t('USERNAME')}</span>
                </label>
                <Formik
                  initialValues={{ username: user?.username || '' }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.username.trim()) {
                      errors.username = 'Username cannot be empty';
                    } else if (values.username.length < 2) {
                      errors.username =
                        'Username must be at least 3 characters';
                    } else if (values.username.length > 20) {
                      errors.username =
                        'Username must be at most 20 characters';
                    }
                    return errors;
                  }}
                  onSubmit={handleChangeUsername}
                  validationSchema={getProfileNameValidation(t)}
                >
                  {({ errors, touched }) => (
                    <Form id="usernameForm">
                      <Field
                        name="username"
                        values
                        type="text"
                        className="w-full p-2 border border-gray-600 rounded-md text-black"
                      />
                      {errors.username && touched.username && (
                        <div className="text-red-500 text-[12px] leading-[16px] mt-1">
                          {errors.username}
                        </div>
                      )}
                      <ErrorMessage
                        name="identifire"
                        component="div"
                        className="text-12 text-red-700"
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </ModalLayout>
          </div>
          {demoUser ? (
            ''
          ) : (
            <>
              <div className="flex px-4 py-1 justify-between items-center">
                <p className="font-poppins font-medium text-16 leading-[24px]">
                  {t('PHONE_NUMBER')}
                </p>
                <p className="font-poppins font-normal text-16 leading-[24px]">
                  {status === 'loading' ? (
                    <Skeleton width={120} height={20} />
                  ) : (
                    user?.mobile || '-'
                  )}
                </p>
              </div>
              <div className="flex px-4 py-1 justify-between items-center">
                <p className="font-poppins font-medium text-16 leading-[24px]">
                  {t('PASSWORD')}
                </p>
                <p
                  onClick={() => navigate(LOCALE + '/change-password')}
                  className="font-poppins underline text-blue-500 font-normal text-16 leading-[24px] cursor-pointer"
                >
                  {t('CHANGE')}
                </p>
              </div>
            </>
          )}
        </div>

        {/* <section className=" mt-4  ">
          <div className="relative ">
            <div className="absolute inset-0 -z-10">
              <img
                src={`${process.env.IMAGE_KIT}/images/Vipbg.png`}
                alt=""
                className="w-full h-[170px] object-cover rounded-xl"
              />
            </div>
            <div className="p-2 px-3 pt-4 text-black">
              <h2 className="w-[220px] font-poppins font-semibold text-16  leading-[20px]">
                {t('HEADING_ONE')}
              </h2>
              <p className="font-poppins pt-2 font-medium text-14 leading-[20px]">
                {t('HEADING_TWO')}
              </p>
            </div>
            <div className="w-1/2">
              <CustomButton
                label="Vip"
                classname="w-1/2 mt-2 h-11 shadow-2xl  ml-4"
                onClick={() => navigate(LOCALE + '/vip')}
              />
            </div>
          </div>
        </section> */}

        <section className=" mt-4">
          <div className="flex  gap-2">
            <div
              onClick={() => navigate(LOCALE + '/bet-history')}
              className="bg-custom-gradient px-1 w-full rounded-lg py-2 text-black cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-1">
                  <img
                    src={`${process.env.IMAGE_KIT}/images/history.png`}
                    alt=""
                    className="w-[28%]"
                  />
                  <div className="flex flex-col gap-0">
                    <h2 className="font-poppins whitespace-nowrap font-semibold text-16 leading-[21px]">
                      {t('GAME_HISTORY')}
                    </h2>
                    <p className="font-poppins  mt-1 font-normal text-12 leading-[18px]">
                      {t('DATA')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-custom-gradient w-full px-1 rounded-lg py-2 text-black cursor-pointer">
              <div onClick={() => navigate(LOCALE + '/transaction-history')}>
                <div className="flex items-center gap-1">
                  <img
                    src={`${process.env.IMAGE_KIT}/images/transction.png`}
                    alt=""
                    className="w-[28%]"
                  />
                  <div className="flex flex-col gap-0">
                    <h2 className="font-poppins font-semibold text-16 leading-[17px]">
                      <Trans
                        i18nKey="TRANSACTION_HISTORY"
                        components={{ br: <br /> }}
                      />
                    </h2>

                    <p className="font-poppins MT-1 font-normal text-12 leading-[18px]">
                      {t('DATA')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" mt-4">
          <div className="bg-white rounded-lg text-black px-2">
            {/* <div
              onClick={() => navigate(LOCALE + '/starterkit')}
              className="flex  py-2 justify-between items-center"
            >
              <div className="flex  items-center gap-2">
                <img
                  src={`${process.env.IMAGE_KIT}/images/starter.png`}
                  alt=""
                  width={30}
                />
                <h3 className="font-poppins font-normal text-17 leading-[21px]">
                  {t('STARTER')}
                </h3>
              </div>
              <span className="text-black text-[20px]">
                {reactIcons.rightArrow}
              </span>
            </div>
            <hr /> */}
            <div
              onClick={() => navigate(LOCALE + '/game-statistics')}
              className="flex  py-2 justify-between items-center cursor-pointer"
            >
              <div className="flex  items-center gap-2">
                <img
                  src={`${process.env.IMAGE_KIT}/images/static.png`}
                  alt=""
                  width={30}
                />
                <h3 className="font-poppins font-normal text-17 leading-[21px]">
                  {t('GAME')}
                </h3>
              </div>
              <span className="text-black text-[20px]">
                {reactIcons.rightArrow}
              </span>
            </div>
            <hr />
            {/* <div
              onClick={() => navigate(LOCALE + '/feedback')}
              className="flex  py-2 justify-between items-center"
            >
              <div className="flex  items-center gap-2">
                <img src="/images/feedback.svg" alt="" />
                <h3 className="font-poppins font-normal text-17 leading-[21px]">
                  {t('FEEDBACK')}
                </h3>
              </div>
              <span className="text-black text-[20px]">
                {reactIcons.rightArrow}
              </span>
            </div> */}
            <hr />
            <div
              onClick={() => navigate(LOCALE + '/about-us')}
              className="flex  py-2 justify-between items-center cursor-pointer"
            >
              <div className="flex  items-center gap-2">
                <img
                  src={`${process.env.IMAGE_KIT}/images/about.png`}
                  alt=""
                  width={30}
                />
                <h3 className="font-poppins font-normal text-17 leading-[21px]">
                  {t('ABOUT')}
                </h3>
              </div>
              <span className="text-black text-[20px]">
                {reactIcons.rightArrow}
              </span>
            </div>
            <hr />
            <div
              onClick={() => navigate(LOCALE + '/language')}
              className="flex  py-2 justify-between items-center cursor-pointer"
            >
              <div className="flex  items-center gap-2">
                <img
                  src={`${process.env.IMAGE_KIT}/images/language.png`}
                  alt=""
                  width={30}
                />
                <h3 className="font-poppins font-normal text-17 leading-[21px]">
                  {t('LANGUAGE')}
                </h3>
              </div>
              <div className="flex">
                <h3 className="font-poppins font-normal text-17 leading-[21px]">
                  {i18nextLng == 'en' ? 'English' : 'हिन्दी'}
                </h3>
                <span className="text-black text-[20px]">
                  {reactIcons.rightArrow}
                </span>
              </div>
            </div>
            <hr />
          </div>
        </section>
        <section className="  mb-20">
          <div className="my-4">
            {isLogin ? (
              <button
                className="w-full font-poppins font-normal text-[17px] leading-[22px] rounded-md bg-[#FF1E1E] h-11"
                onClick={handleOpen}
              >
                {t('LOGOUT')}
              </button>
            ) : (
              ''
            )}

            <ModalPopup
              open={open}
              handleClose={handleClose}
              imageSrc="/images/logout.svg"
              paragraph={t('DO_YOU_WANT_TO_LOG_OUT')}
              button1={{
                text: t('CONTIRMS'),
                onClick: () => {
                  sessionStorage.clear();
                  navigate(LOCALE + '/');
                  handleClose();
                },
                className:
                  'w-full text-black rounded-full bg-red-500 hover:bg-red-600',
              }}
              button2={{
                text: t('CANCEL'),
                onClick: handleClose,
                className:
                  'w-full text-white bg-black hover:bg-custom-gradient',
              }}
              bgColor="#2E2E2E"
              textColor="white"
            />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
