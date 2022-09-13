import { Application } from 'egg';
// import UserRouter from './router_module/user';
// import PageRouter from './routers/page';
import ApplicationRouter from './routers/application';
import UploadRouter from './routers/upload';
import PageRouter from './routers/page';
import { initRouter } from 'egg-router-decorator';
function createRoute(app, config) {
  const { router } = app;
  config.forEach(data => {
    const [ method, path, handler ] = data;
    router[method.toLocaleLowerCase()](path, handler);
  });
}

export default (app: Application) => {
  // const { controller, router } = app;
  // router.get('/', controller.home.index);

  // createRoute(app, PageRouter);
  createRoute(app, ApplicationRouter);
  createRoute(app, UploadRouter);
  createRoute(app, PageRouter);

  initRouter(app, { prefix: '/api' });
};
