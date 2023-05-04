function getPublicConfigByEnv(env) {
  const commonI18n = {
    appLocales: ['de', 'de_CH', 'en', 'it', 'fr'],
    switchKey: true,
  };
  const commonAuth = {
    clientId: 'wefox-valid-client',
    privateLandingPath: '/dashboard',
    publicLandingPath: '/welcome',
    realm: 'your-realm',
    requiredScopes: ['some:role'],
  };

  const config = {
    local: {
      i18n: {
        ...commonI18n,
        localesURL: 'https://cdn-web-sandbox.wefox.com/public/locales/customer/dev/',
        languageResource: 'https://api-customer-dev.wefox.com/languages',
      },
      auth: {
        ...commonAuth,
        keycloakUrl: 'https://id-dev.wefox.com/auth',
      },
    },
    dev: {
      i18n: {
        ...commonI18n,
        localesURL: 'https://cdn-web-sandbox.wefox.com/public/locales/customer/dev/',
        languageResource: 'https://api-customer-dev.wefox.com/languages',
      },
      auth: {
        ...commonAuth,
        keycloakUrl: 'https://id-dev.wefox.com/auth',
      },
    },
    stg: {
      i18n: {
        ...commonI18n,
        localesURL: 'https://cdn-web-sandbox.wefox.com/public/locales/customer/stg/',
        languageResource: 'https://api-customer-stg.wefox.com/languages',
      },
      auth: {
        ...commonAuth,
        keycloakUrl: 'https://id-stg.wefox.com/auth',
      },
    },
    pro: {
      i18n: {
        ...commonI18n,
        localesURL: 'https://cdn-web.wefox.com/public/locales/customer/',
        languageResource: 'https://api-customer-dev.wefox.com/languages',
        switchKey: false,
      },
      auth: {
        ...commonAuth,
        keycloakUrl: 'https://id.wefox.com/auth',
      },
    },
  };

  return JSON.stringify(config[env]);
}

exports.getPublicConfigByEnv = getPublicConfigByEnv;
