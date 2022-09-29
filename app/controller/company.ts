import BaseController from './base';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/company')
export default class CompanyController extends BaseController {


  @routerDecorator.get('/getCompanyById')
  public async getCompanyById() {
    const { id } = this.ctx.query;
    const data = await this.ctx.service.company.getCompanyById(id);
    this.result(data);
  }
}
