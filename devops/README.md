# wefox web root boilerplate DevOps

The deployment management is done through GitHub Actions and is explained in [CI/CD Workflows > Deployment (Server - Kubernetes)](https://financefox.atlassian.net/wiki/spaces/WTOM/pages/2154856590/Deployment+Server+-+Kubernetes).

## Dockerfile

File: [Dockerfile.build](../Dockerfile.build)

- base image: `node:12-alpine`
- non-privileged: Docker runs _node_ as a `non root`, unprivileged user
- listen port: `3000`
- server: `Express`
- security: `Helmet`
  - _dnsPrefetchControl_: controls browser DNS prefetching
  - _frameguard_: to prevent clickjacking
  - _hidePoweredBy_: to remove the X-Powered-By header
  - _hsts_: for HTTP Strict Transport Security
  - _ieNoOpen_: sets X-Download-Options for IE8+
  - _noSniff_: to keep clients from sniffing the MIME type
  - _xssFilter_: adds some small XSS protections
