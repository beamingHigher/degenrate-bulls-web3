const axios = require('axios');

const httpsRequest = {};

httpsRequest.Get = (url, params) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      await axios.get(url, params).then((response) => {
        resolve(response.data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export { httpsRequest };