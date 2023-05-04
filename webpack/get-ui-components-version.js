// get UI components version based on the environment
// env: local | dev | stg | pro
function getUIComponentsVersion(env) {
  const uiComponentsVersions = {
    local: '1.21.0',
    dev: '1.21.0',
    stg: '1.21.0',
    pro: '1.21.0',
  };

  return uiComponentsVersions[env];
}
exports.getUIComponentsVersion = getUIComponentsVersion;
