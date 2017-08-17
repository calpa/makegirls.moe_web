import Config from '../Config';

class Utils {
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static keyToString(key) {
    return key.split('_').map(Utils.capitalize).join(' ');
  }

  static arrayToObject(arr, key, value) {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
      res[key(arr[i])] = value ? value(arr[i]) : arr[i];
    }
    return res;
  }

  static randomNormal(ref) {
    const u = 1 - Math.random();
    const v = 1 - Math.random();
    if (typeof ref === 'function') {
      ref(u, v);
    }
    return Utils.uniformToNormal(u, v);
  }

  static uniformToNormal(u, v) {
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static usingCellularData() {
    const con = window.navigator.connection;
    if (con) {
      return con.type === 'cellular';
    }

    const ua = window.navigator.userAgent;
    if (/MicroMessenger/.test(ua)) {
      if (/NetType/.test(ua)) {
        const type = ua.match(/NetType\/(\S*)/);
        return type.indexOf('2G') !== -1 || type.indexOf('3G') !== -1 || type.indexOf('4G') !== -1;
      }
    }

    return false;
  }

  static sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }

  static flatMap(arr, lambda) {
    return Array.prototype.concat.apply([], arr.map(lambda));
  }

  static promiseTimeout(timeout) {
    return new Promise((fulfill, reject) => {
      setTimeout(reject, timeout);
    });
  }

  static getCountry() {
    return Promise.race([
      window.$.get(Config.geoip.url),
      Utils.promiseTimeout(Config.geoip.timeout),
    ]).then((data) => {
      if (data) {
        return data.country;
      }
      return null;
    }).catch(err => null);
  }
}

export default Utils;
