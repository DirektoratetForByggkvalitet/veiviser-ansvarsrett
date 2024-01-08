import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Wizard, StyleProvider, trackEvent, track } from "losen";
import data from "./api/ansvarsrett";
import dataExport from "./exports/data-export";
import Intro from "./pages/Intro";
import { store } from "./store";

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
          <Intro close={closeIntro} data={data} />
        </StyleProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Wizard
        wizard={data}
        exports={{ dataExport }}
        translations={translations}
        showIntro={showIntro}
      />
    </Provider>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
