import Config from '../Config';

class Twitter {
  static get(url, query = {}) {
    return window.$.ajax({
      method: 'GET',
      url: Config.twitter.urlPrefix + url,
      data: query,
      dataType: 'json',
    });
  }

  static post(url, data = {}) {
    return window.$.ajax({
      method: 'POST',
      url: Config.twitter.urlPrefix + url,
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      xhrFields: {
        withCredentials: true,
      },
    }).catch(response => Promise.reject(response.responseJSON ? response.responseJSON.error : null));
  }

  static getAuthUrl() {
    return `${Config.twitter.urlPrefix}/auth?callback=${encodeURIComponent(Config.twitter.callback)}`;
  }

  static submit(text, image, noise) {
    return Twitter.post('/submit', {
      text,
      image,
      noise,
    });
  }
}

export default Twitter;
