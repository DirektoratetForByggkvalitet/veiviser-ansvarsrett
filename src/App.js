/* globals window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import autobind from 'react-autobind';

import {
  Wizard, StyleProvider, trackEvent, track,
} from 'losen';
import data from './api/ansvarsrett.json';
import dataExport from './exports/data-export';
import Intro from './pages/Intro';
import store from './store';

const propTypes = {
  translations: PropTypes.object,
};

const defaultProps = {
  translations: {},
};

export default class App extends Component {
  static trackIntro() {
    track(data.meta.name, 'intro', 'Finn ut om du kan erklære ansvar!');
  }

  constructor(props) {
    super(props);
    this.state = {
      intro: true,
    };
    autobind(this);
  }

  closeIntro() {
    this.setState({
      intro: false,
    });
    window.scrollTo(0, 0);
    trackEvent('close-intro');
  }

  showIntro() {
    this.setState({ intro: true });
    window.scrollTo(0, 0);
  }

  render() {
    const { intro } = this.state;
    const { translations } = this.props;
    if (intro) {
      App.trackIntro();
      return (
        <Provider store={store}>
          <StyleProvider>
            <Intro close={this.closeIntro} />
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
          showIntro={this.showIntro}
        />
      </Provider>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
