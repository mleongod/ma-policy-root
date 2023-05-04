import { registerApplication, start } from 'single-spa';
import { constructApplications, constructLayoutEngine, constructRoutes } from 'single-spa-layout';
import { envInitPromise, i18nInitPromise } from './init';

Promise.all([i18nInitPromise, envInitPromise]).then(() => {
  const routes = constructRoutes(document.querySelector('#single-spa-layout') as HTMLTemplateElement);
  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
    },
  });
  const layoutEngine = constructLayoutEngine({ routes, applications });

  applications.forEach((app) => {
    registerApplication({
      ...app,
    });
  });
  layoutEngine.activate();
  start();
  start();
});
