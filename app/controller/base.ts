import { Controller } from 'egg';

export default class BaseController extends Controller {
  result(data: any, code = 20000, success = true, msg = '请求成功') {
    this.ctx.body = {
      code,
      data,
      success,
      msg,
    };
  }
}
