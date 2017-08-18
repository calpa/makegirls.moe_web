import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import Config from '../Config';
import About from './About';
import News from './News';
import Tips from './Tips';
import ProgressBar from './ProgressBar';
import Generator from './Generator';
import Options from './Options';
import PromptDialog from './PromptDialog';
import GAN from '../utils/GAN';
import Utils from '../utils/Utils';
import Stat from '../utils/Stat';
import ImageEncoder from '../utils/ImageEncoder';
import Twitter from '../utils/Twitter';
import './Home.css';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      gan: {
        loadingProgress: 0,
        isReady: false,
        isRunning: false,
        isCanceled: false,
        isError: false,
      },
      options: {
        amount: 1,
      },
      results: [],
      twitter: {
        visible: false,
      },
      rating: 0,
    };
    this.gan = new GAN();
  }

  async componentDidMount() {
    Stat.init({ cellularData: Utils.usingCellularData() });
    this.showTwitterTimeline();

    if (Utils.usingCellularData()) {
      try {
        await this.dialog.show();
      } catch (err) {
        this.setState({ gan: Object.assign({}, this.state.gan, { isCanceled: true }) });
        return;
      }
    }

    try {
      const startTime = new Date();
      await this.gan.init((current, total) => this.setState({ gan: Object.assign({}, this.state.gan, { loadingProgress: current / total * 100 }) }));
      const endTime = new Date();
      var loadTime = (endTime.getTime() - startTime.getTime()) / 1000;
    } catch (err) {
      this.setState({ gan: Object.assign({}, this.state.gan, { isError: true }) });
      return;
    }

    Stat.modelLoaded(loadTime);
    this.setState({ gan: { isReady: true } });
  }

  showTwitterTimeline() {
    window.twttr.ready(() => {
      window.twttr.widgets.createTimeline(
                '897941606237704192',
                document.getElementById('twitter-timeline-container'),
        {
          height: 600,
          chrome: 'noheader',
        },
            ).then(() => {
              this.setState({ twitter: Object.assign({}, this.state.twitter, { visible: true }) });
              if (this.props.onTimelineLoad) {
                this.props.onTimelineLoad();
              }
            });
    });
  }

  setNoiseOrigin(noiseOrigin) {
    const noise = noiseOrigin.map(([u, v]) => Utils.uniformToNormal(u, v));
    this.setState({
      gan: Object.assign({}, this.state.gan, { noise, noiseOrigin }),
      options: Object.assign({}, this.state.options, { noise: 1 }),
    });
  }

  getLabel() {
    const label = Array(...{ length: Config.gan.labelLength }).map(() => -1);
    for (let i = 0; i < Config.options.length; i++) {
      const option = Config.options[i];
      const value = this.state.options[option.key];
      if (!value) {
        if (option.type === 'multiple') {
          if (option.isIndependent) {
            for (var j = 0; j < option.options.length; j++) {
              label[option.offset + j] = Math.random() < option.prob[j] ? 1 : -1;
            }
          } else {
            let random = Math.random();
            for (j = 0; j < option.options.length; j++) {
              if (random < option.prob[j]) {
                label[option.offset + j] = 1;
                break;
              } else {
                random -= option.prob[j];
              }
            }
          }
        } else {
          label[option.offset] = Math.random() < option.prob ? 1 : -1;
        }
      } else if (option.type === 'multiple') {
        label[option.offset + value - 1] = 1;
      } else {
        label[option.offset] = value;
      }
    }

    return label;
  }

  async generate() {
    this.setState({
      gan: Object.assign({}, this.state.gan, { isRunning: true }),
    });

    for (let i = 0; i < this.state.options.amount; i++) {
      const label = this.getLabel();
      const result = await this.gan.run(label, this.state.options.noise ? this.state.gan.noise : null, this.state.options.noise ? this.state.gan.noiseOrigin : null);
      if (i === 0) {
        this.setState({
          results: [result],
        });
      } else {
        this.setState({
          results: this.state.results.concat([result]),
        });
      }
    }

    Stat.generate(this.state.options);
    this.setState({
      gan: Object.assign({}, this.state.gan, { isRunning: false, noise: this.gan.getCurrentNoise(), noiseOrigin: this.gan.getCurrentNoiseOrigin(), input: this.gan.getCurrentInput() }),
      rating: 0,
    });
  }

  shareOnTwitter() {
    localStorage.twitter_image = ImageEncoder.encode(this.state.results.slice(-1)[0]);
    localStorage.twitter_noise = ImageEncoder.encodeNoiseOrigin(this.state.gan.noiseOrigin);
    const win = window.open(Twitter.getAuthUrl(), '_blank');
    win.focus();
  }

  submitRating(value) {
    Stat.rate(this.gan.getCurrentInput(), value);
    this.setState({ rating: value });
  }

  render() {
    return (
      <div className="home">

        <div className="row main-row">
          <div className={this.state.twitter.visible ? 'col-lg-8 ' : '' + 'col-xs-12'}>
            <div className="row progress-container">
              <CSSTransitionGroup
                transitionName="progress-transition"
                transitionEnterTimeout={0}
                transitionLeaveTimeout={1000}
              >

                {!this.state.gan.isReady &&
                <div className="col-xs-12">
                  <ProgressBar value={this.state.gan.loadingProgress} />
                  <h5 className="progress-text" style={{ color: this.state.gan.isCanceled || this.state.gan.isError ? '#f00' : '#000' }}>
                    {this.state.gan.isCanceled ? 'Canceled' : this.state.gan.isError ? 'Network Error' : 'Loading Model...'}
                  </h5>
                </div>
                                }

              </CSSTransitionGroup>
            </div>

            <div className="row">
              <div className="col-sm-3 col-xs-12 generator-container">
                <Generator
                  gan={this.state.gan}
                  results={this.state.results}
                  onGenerateClick={() => this.generate()}
                  onTwitterClick={() => this.shareOnTwitter()}
                  onRatingClick={value => this.submitRating(value)}
                  rating={this.state.rating}
                />
              </div>
              <div className="col-sm-9 col-xs-12 options-container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() =>
                      (<Options
                        options={Config.options}
                        values={this.state.options}
                        noise={this.state.gan.noiseOrigin}
                        input={this.state.gan.input}
                        onChange={(key, value) => this.setState({ options: Object.assign({}, this.state.options, { [key]: value }) })}
                        onNoiseLoad={noiseOrigin => this.setNoiseOrigin(noiseOrigin)}
                      />)
                                    }
                  />
                  <Route path="/about" component={About} />
                  <Route path="/news" component={News} />
                  <Route path="/tips" component={Tips} />
                </Switch>

              </div>
            </div>
          </div>

          <div className="col-lg-4 col-xs-12" style={{ display: this.state.twitter.visible ? 'block' : 'none' }}>
            <div className="row twitter-timeline-row">
              <div className="col-xs-12">
                <h3 className="twitter-timeline-title" style={{ color: Config.colors.theme }}>#MakeGirlsMoe on Twitter</h3>
                <div id="twitter-timeline-container" />
              </div>
            </div>
          </div>

        </div>

        <PromptDialog
          ref={dialog => this.dialog = dialog}
          title="Note"
          message="You are using mobile data network. We strongly recommend you to connect to Wi-Fi when accessing this website. Are you sure to continue?"
        />

      </div>
    );
  }
}

export default Home;
