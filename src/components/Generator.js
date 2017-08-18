import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Config from '../Config';
import ButtonPrimary from './ButtonPrimary';
import ResultCanvas from './ResultCanvas';
import RatingButtons from './RatingButtons';
import twitterLogo from '../img/Twitter_bird_logo_2012.svg';
import './Generator.css';

class Generator extends Component {

  onRatingClick(value) {
    this.props.onRatingClick(value);
  }

  renderResultCanvas(result, index) {
    return (
      <div key={index} className="result-container" style={{ zIndex: 1000 + index }}>
        <ResultCanvas result={result} />
      </div>
    );
  }

  render() {
    const resultWrapperStyle = {
      height: Config.gan.imageHeight,
      width: Config.gan.imageWidth,
    };

    return (
      <div className="generator">
        <div className="result-wrapper" style={resultWrapperStyle}>
          {this.props.results ? this.props.results.map((result, index) => this.renderResultCanvas(result, index)) : null}
        </div>
        <ButtonPrimary
          text={this.props.gan.isRunning ? 'Generating...' : 'Generate'}
          disabled={this.props.gan.isRunning || !this.props.gan.isReady}
          onClick={this.props.onGenerateClick}
        />


        <CSSTransitionGroup
          transitionName="rating-transition"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
        >

          {this.props.results.length > 0 &&
            <div className="rating btn-rating">
              <div className="rating-text" style={{ color: this.props.rating === 0 ? 'black' : 'green' }}>{this.props.rating === 0 ? '' : 'Thank you!'}</div>
              <RatingButtons value={this.props.rating} onChange={value => this.onRatingClick(value)} />
            </div>
                    }

        </CSSTransitionGroup>

        <CSSTransitionGroup
          transitionName="twitter-transition"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
        >

          {this.props.results.length > 0 &&
            <button
              className="btn btn-default btn-twitter"
              onClick={this.props.onTwitterClick}
            >
              <img className="twitter-logo" src={twitterLogo} alt="Twitter Logo" />
              <span>Share on Twitter</span>
            </button>
                    }

        </CSSTransitionGroup>

      </div>
    );
  }
}

export default Generator;
