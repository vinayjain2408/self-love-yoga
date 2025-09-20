import React, { Fragment } from 'react';
import i18next from 'i18next';
import { Helmet } from 'react-helmet';
import { Welcome } from '@/components';
// import Footer from '@/components/Footer';

function Landing() {
  return (
    <Fragment>
      <Helmet>
        <html lang={i18next.language} dir={i18next.dir(i18next.language)} />
      </Helmet>

      <Welcome />
      {/* <Footer /> */}
    </Fragment>
  );
}

export default Landing;
