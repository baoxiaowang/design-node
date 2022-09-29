import BaseController from './base';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/user')
export default class UserController extends BaseController {

  @routerDecorator.post('/info')
  @routerDecorator.get('/info')
  public async info() {
    const { userPhone, companyId } = this.ctx;
    console.log('@@@@@@@', companyId);
    const data = await this.ctx.service.user.getLoginUserInfo({
      userPhone,
      companyId,
    });
    this.result(data);
  }

  @routerDecorator.post('/register')
  public async register() {
    const { companyName, name, phone, password } = this.ctx.request.body;
    const data = await this.ctx.service.user.userRegister({ companyName, name, phone, password });
    this.result(data);
  }

  @routerDecorator.post('/login')
  public async login() {
    const { phone, password } = this.ctx.request.body;
    const [ loginSuccess, companyList, error ] = await this.ctx.service.user.userLogin({ phone, password });
    if (!loginSuccess) {
      this.result(false, 3000, false, error);
      return;
    }
    this.result(companyList);
  }
}
