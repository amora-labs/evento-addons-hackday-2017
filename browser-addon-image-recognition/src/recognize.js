import Clarifai from 'clarifai';
import { isEmpty } from 'lodash';

const recognize = url => browser.storage.local.get()
  .then((data) => {
    const key = data.clarifai_api_key || '';

    if (isEmpty(key)) {
      return Promise.reject(new Error('Missing API Key'));
    }

    const app = new Clarifai.App({
      apiKey: key,
    });

    return app
      .models
      .predict(Clarifai.GENERAL_MODEL, url);
  });

export default recognize;
