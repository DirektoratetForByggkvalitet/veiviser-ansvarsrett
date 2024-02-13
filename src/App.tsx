import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Provider, connect } from "react-redux";
import { Wizard, StyleProvider, trackEvent, track, state } from "losen";
import data from "./api/ansvarsrett";
import dataExport from "./exports/data-export";
import { PersistGate } from "redux-persist/integration/react";

import Intro from "./pages/Intro";
import { store, persistor } from "./store";

const propTypes = {
  translations: PropTypes.object,
};

const defaultProps = {
  translations: {},
};

const trackIntro = () => {
  track(data.meta.name, "intro", "Finn ut om du kan erklære ansvar!");
};

const App = ({ translations }: any) => {
  const [intro, setIntro] = useState(true);

  const closeIntro = () => {
    setIntro(false);
    window.scrollTo(0, 0);
    trackEvent("close-intro");
  };

  const showIntro = () => {
    setIntro(true);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (intro) {
      trackIntro();
    }
  }, [intro]);

  if (intro) {
    return (
      <Provider store={store}>
        <StyleProvider>
          <Intro close={closeIntro} />
        </StyleProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Wizard
          wizard={data}
          exports={{ dataExport }}
          translations={translations}
          showIntro={showIntro}
        />
      </PersistGate>
    </Provider>
  );
};
const mapStateToProps = ({ [state.NAME]: { $computed, ...wizardData } }) => ({
  hasData: !!Object.keys(wizardData).length,
});

export default connect(mapStateToProps)(App);
