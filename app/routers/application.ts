export default [
  [
    'POST',
    '/api/application/create',
    'application.create',
  ],
  [
    'POST',
    '/api/application/del',
    'application.del',
  ],
  [
    'GET',
    '/api/application/getById',
    'application.getById',
  ],
  [
    'GET',
    '/api/application/getList',
    'application.getListByPage',
  ],
];
