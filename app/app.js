/* eslint-disable react-hooks/exhaustive-deps */
import './i18n';
import React, { useContext } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {
  AboutUs,
  Home,
  NotFound,
  Notification,
} from './containers/pageListAsync';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layout';
import { isLoggedIn } from './utils/apiHandlers';
import Cookies from 'js-cookie';
import LocaleContext from './contexts/LocaleContext';
import { Bounce, ToastContainer } from 'react-toastify';
import ScrollToTop from './helpers/ScrollToTop';
import Notifications from './components/Notifications';

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

  if (!authorisation) {
    Cookies.remove('test__users__isLoggedIn');
  }
  const isLogin = isLoggedIn();
  // console.log(Cookies.get('__user__authToken'));
  console.log(isLogin, 'isLogin');

  return (
    <>
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <ScrollToTop />
        <Notifications />
        <Routes>
          <Route path={`/${LOCALE}`} element={<MainLayout />}>
            {/* Example route: "/en" */}
            <Route path="" element={<Home />} />
            <Route path="aboutus" element={<AboutUs />} />

            {/* Nested Routes under locale */}
            <Route path="notification" element={<Notification />} />
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
