// get Google Tag Manager key based on the environment
// env: local | dev | stg | pro

function getGtmKey(env) {
  const gtmKeys = {
    local: 'GTM-5QGG8X6',
    dev: 'GTM-5QGG8X6',
    stg: 'GTM-5QGG8X6',
    pro: 'GTM-5QGG8X6',
  };

  return gtmKeys[env];
}

exports.getGtmKey = getGtmKey;
