/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
//import { authModule } from '@wefox/auth';
// @ts-ignore
import { language } from '@wefox/i18n';
// @ts-ignore
import { http } from '@wefox/http';

const i18nInitPromise = language.initLanguages(window.wefoxConfig.i18n);
//const authInitPromise = authModule.initKeycloak(window.wefoxConfig.auth);

const envInitPromise = new Promise((resolve, reject) => {
  http
    .get('http://localhost:5001/config/env.json')
    .then(({ countryCode }) => {
      localStorage.setItem('countryCode', countryCode);
      resolve(true);
    })
    .catch((error) => reject(error));
});

export { i18nInitPromise, envInitPromise };
