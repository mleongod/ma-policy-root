# wefox web root boilerplate

[![PR review](https://github.com/uberforcede/wefox-web-root-boilerplate/workflows/PR%20review/badge.svg)](https://github.com/uberforcede/wefox-web-root-boilerplate/actions?query=workflow%3A%22PR+review%22) [![Deployment](https://github.com/uberforcede/wefox-web-root-boilerplate/workflows/Deployment/badge.svg)](https://github.com/uberforcede/wefox-web-root-boilerplate/actions?query=workflow%3ADeployment) [![Translations](https://github.com/uberforcede/wefox-web-root-boilerplate/workflows/Translations/badge.svg)](https://github.com/uberforcede/wefox-web-root-boilerplate/actions?query=workflow%3A%22Translations%22)

## Index

1. [Usage](#usage)
   1. [Read and understand](#read-and-understand)
   1. [Setup](#setup)
   1. [NPM scripts](#npm-scripts)
1. [Development URLs](#development-urls)
1. [Directory structure overview](#directory-structure-overview)
1. [Deploy](#deploy)
1. [Translations](#translations)

## Usage

### Read and understand

- Git workflows:
  - [Git](https://github.com/uberforcede/wg-core-guidelines/tree/master/git#readme)
  - [Git Feature Branch](https://github.com/uberforcede/wg-core-guidelines/blob/master/git/workflows/GIT_FEATURE_BRANCH.md)
- Code style guides:
  - [JavaScript](https://github.com/uberforcede/wg-core-guidelines/tree/master/javascript#readme)
  - [TypeScript](https://github.com/uberforcede/wg-core-guidelines/tree/master/javascript/typescript#readme)
  - [Angular](https://github.com/uberforcede/wg-core-guidelines/tree/master/javascript/angular#readme)
  - [React/JSX](https://github.com/uberforcede/wg-core-guidelines/tree/master/javascript/react)
- NPM registry: [NPM private registry](https://github.com/uberforcede/wg-core-guidelines/tree/master/javascript/npm-registry#readme)
- Deployment flow strategy:
  - [Frontend publish and deployment](https://financefox.atlassian.net/wiki/spaces/WTOM/pages/2155315306/Frontend+publish+and+deployment)
  - [Backend deployment](https://financefox.atlassian.net/wiki/spaces/WTOM/pages/2154856590/Backend+deployment)

### Setup

1. `git clone` this repository
1. Make sure the _Node_ version defined in the project is being used. It is recommended to use a version manager, for example [nvm](https://github.com/nvm-sh/nvm)
1. Duplicate _.env.example_ and create _.env_ file with appropriate values
1. Duplicate _client/src/importmaps/local/\*.json.example_ and create _.json_ files with appropriate values
1. Make sure the NPM private registry has been setup ([registry users](https://github.com/uberforcede/wg-core-guidelines/tree/master/javascript/npm-registry#registry-users))
1. Install dependencies: `npm install`

### Before start

- By default our root has an auth behaviour, this means that the auth config must be added before start in the [commonAuth](webpack/get-public-config.js) property, i.e:

```
  const commonAuth = {
    clientId: 'wefox-web-root',
    privateLandingPath: '/dashboard',
    publicLandingPath: '/welcome',
    realm: 'wefox',
    requiredScopes: ['root:read','root:update'],
  };
```

This configuration must be added in keycloak, the team in charge of do that is the Customer Domain.

In case you don't have/want to use auth, just remove the following pieces of code.

- Remove all the auth references from the following files:

  - [init.ts](client/src/init.ts)
  - [index.ts](client/src/index.ts)
  - [dev/core.importmap.json](client/src/importmaps/dev/core.importmap.json)
  - [stg/core.importmap.json](client/src/importmaps/stg/core.importmap.json)
  - [pro/core.importmap.json](client/src/importmaps/pro/core.importmap.json)


- Setup you first microfrontend in prefferd environment, we suggest starting from dev, in the following file [dev/ma.importmap.json](client/src/importmaps/dev/ma.importmap.json) add your microfrontend url, i.e:

  ```json
    "@wefox/ma-react": "http://localhost:8081/main.js",
  ```

- Setup a route in the [index.ejs](client/src/index.ejs) for your microfrontend to be accessible in your browser, i.e:

  ```js
  <template id="single-spa-layout">
    <single-spa-router>
      <route path="/react">
        <application name="@wefox/ma-react"></application>
      </route>
    </single-spa-router>
  </template>
  ```

### NPM scripts

**Start:**

- `start`: run `start:client:local` command as fallback
- `start:client:local`: start client application with local configuration
- `start:client:dev`: start client application with development configuration
- `start:client:stg`: start client application with staging configuration
- `start:client:pro`: start client application with production configuration
- `start:server:dev`: start server application in development mode (live reload activated)
- `start:server:pro`: start server application in production mode

**Build:**

- `build`: run `build:clean`, `build:server` and `build:client:local` commands on a sequence
- `build:clean`: remove _dist_ folder
- `build:client:local`: build client application with local configuration
- `build:client:dev`: build client application with development configuration
- `build:client:stg`: build client application with staging configuration
- `build:client:pro`: build client application with production configuration
- `build:server`: build server application

**Format:**

- `lint`: runs ESlint checker
- `format:check`: runs Prettier checker
- `format:write`: updates files following the Prettier format style

## Development URLs

- Client: <http://localhost:4000>
- Server: <http://localhost:3000>

## Directory structure overview

Source files are placed in folders _client_ and _server_. When these files are then compiled, a distribution folder _dist_ is created, ready for deployment.

```bash
├── .dockerignore       # Exclude files and directories in the Docker context config
├── .editorconfig       # EditorConfig file format and collection config
├── .env                # Environment variables
├── .env.example        # Environment variables example file
├── .eslintignore       # Ignore files and directories in eslint config
├── .eslintrc.js        # ESLint config
├── [+] .github/        # GitHub config files: GH actions workflows, PR template, codeowners,...
├── .gitignore          # Ignore files and directories in Git config
├── .npmrc              # NPM config
├── .nvmrc              # Node version manager config
├── .prettierignore     # Ignore files and directories in Prettier config
├── .prettierrc.js      # Prettier config
├── Dockerfile.build    # Dockerfile config to assemble distribution image
├── [+] client/         # Client source
├── [+] devops/         # DevOps config
│   └── [+] kubernetes/ # Kubernetes templates
├── [+] node_modules/   # Project NPM packages
├── package-lock.json   # Automatically generated config file on package.json and node_modules changes
├── package.json        # Project metadata file for scripts, dependencies,...
├── [+] server/         # Server source
├── tsconfig.json       # TypeScript project config file to specify compiler options
└── webpack.config.js   # Webpack config
```

## Deploy

For the application deployment instructions refer to [devops/README.md](devops/README.md)

## Translations

For the translations deployment instructions refer to [CI/CD Workflows > Translations (Lokalise)](https://financefox.atlassian.net/wiki/spaces/WTOM/pages/2259223770/Translations+Lokalise)
