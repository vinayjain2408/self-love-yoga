/* eslint-disable react-hooks/exhaustive-deps */
import './i18n';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {
  AboutUs,
  Home,
  Login,
  NotFound,
  Notification,
  Profile,
  Signup,
} from './containers/pageListAsync';
import { Toaster } from 'react-hot-toast';
import OfflineMessage from './containers/OfflineMessage';
import MainLayout from './layout';
import { isLoggedIn } from './utils/apiHandlers';
import Cookies from 'js-cookie';
import LocaleContext from './contexts/LocaleContext';
import { Bounce, ToastContainer } from 'react-toastify';
import PrivateRoute from './containers/auth/PrivateRoute';
import ScrollToTop from './helpers/ScrollToTop';
import { onMessageListener } from './firebase';
import Notifications from './components/Notifications';
import ReactNotificationComponent from './components/ReactNotificationComponent';

// const sagaMiddleware = createSagaMiddleware();
// const reducer = createReducer();
// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
//   devTools:
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__(),
// });

// sagaMiddleware.run(rootSaga);

function App() {
  const { LOCALE } = useContext(LocaleContext);
  const authorisation = Cookies.get('__user__authToken');
  const [notification, setNotification] = useState([]);

  if (!authorisation) {
    Cookies.remove('test__users__isLoggedIn');
  }
  const isLogin = isLoggedIn();
  // console.log(Cookies.get('__user__authToken'));
  console.log(isLogin, 'isLogin');
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const unsubscribe = onMessageListener(setNotification)
      .then((payload) => {
        setNotifications((prev) => [...prev, payload]);
        console.log(payload, 'onMessagedsfsdListener');
        setTimeout(() => {
          setNotifications((prev) =>
            prev.filter((n) => n.messageId !== payload.messageId),
          );
        }, 3000);
      })
      .catch((err) => console.log('failed: ', err));
    console.log(notification, 'notification');
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [notification]);

  const dismissNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* <Provider store={store}> */}
      <OfflineMessage />
      <BrowserRouter>
        <ScrollToTop />
        <Notifications />

        {notifications.length > 0 && (
          <ReactNotificationComponent
            payloads={notifications}
            dismissNotification={dismissNotification}
          />
        )}
        <Routes>
          <Route path={`/${LOCALE}`} element={<MainLayout />}>
            {/* Example route: "/en" */}
            <Route path="" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="aboutus" element={<AboutUs />} />

            {/* Nested Routes under locale */}
            <Route path="notification" element={<Notification />} />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="about-us" element={<AboutUs />} />
            {/* Catch-all for invalid routes under locale */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Toaster position="top-center" /> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
        }}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {/* </Provider> */}
    </>
  );
}

export default App;
