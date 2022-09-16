import BaseController from './base';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/user')
export default class UserController extends BaseController {


  @routerDecorator.post('/register')
  public async register() {
    const { name, phone, password } = this.ctx.request.body;
    const data = await this.ctx.service.user.userRegister({ name, phone, password });
    this.result(data);
  }

  @routerDecorator.post('/login')
  public async login() {
    const { name, phone, password } = this.ctx.request.body;
    const data = await this.ctx.service.user.userRegister({ name, phone, password });
    this.result(data);
  }

}
