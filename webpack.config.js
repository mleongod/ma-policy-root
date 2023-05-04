const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getPublicConfigByEnv } = require('./webpack/get-public-config');
const { getImportmaps } = require('./webpack/get-import-maps');
const { getGtmKey } = require('./webpack/get-gtm-key');
const { getUIComponentsVersion } = require('./webpack/get-ui-components-version');

const ruleForTsLoader = {
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};
const rules = [ruleForTsLoader];

const plugins = (environment) => [
  new HtmlWebpackPlugin({
    inject: false,
    template: 'client/src/index.ejs',
    params: {
      isDevelopment: environment !== 'pro',
      importmaps: getImportmaps(environment),
      uiComponentsVersion: getUIComponentsVersion(environment),
      gtmKey: getGtmKey(environment),
      publicConfig: getPublicConfigByEnv(environment),
    },
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: 'client/src/assets', to: 'assets' },
      { from: 'client/src/silent-check-sso.html', to: '' },
    ],
  }),
];

module.exports = (env) => {
  return {
    entry: './client/src/index.ts',
    module: { rules },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    plugins: [...plugins(env.environment)],
    externals: ['single-spa', 'single-spa-layout', /^@wefox\/.+$/],
    output: {
      filename: 'root-config.js',
      libraryTarget: 'system',
      path: path.join(__dirname, 'dist', 'public'),
      publicPath: '',
    },
    devtool: env.WEBPACK_SERVE ? 'source-map' : undefined,
    devServer: {
      historyApiFallback: true,
      static: path.join(__dirname, 'client', 'src'),
      port: 5001,
    },
  };
};
