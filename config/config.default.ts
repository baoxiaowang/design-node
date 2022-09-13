import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    // mongoose: {
    //   client: {
    //     url: 'mongodb://127.0.0.1/design',
    //     options: {},
    //   },
    // },
    mongo: {
      client: {
        host: '127.0.0.1',
        port: '27017',
        name: 'design',
        user: '',
        password: '',
        options: {},
      },
    },
    cors: {
      origin(ctx) { // 设置允许来自指定域名请求
        console.log(ctx);
        const whiteList = [ 'http://www.baidu.com', 'http://www.hqyj.com' ];
        const url = ctx.request.header.origin;
        if (whiteList.includes(url?.toString() || '')) {
          return url;
        }
        return 'http://localhost'; // 默认允许本地请求可跨域
      },
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: [ 'http://localhost:5050/' ],
    },


  } as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1661144985388_2743';

  // add your egg config in here
  config.middleware = [ 'auth' ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
