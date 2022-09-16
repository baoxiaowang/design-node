import BaseController from './base';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/form')
export default class FormController extends BaseController {
  /**
   * create
   * 创建表单数据
   */
  @routerDecorator.post('/create')
  public async create() {
    const { formId, formData = {} } = this.ctx.request.body;
    console.log(this.ctx.request.body, '%%%');
    const data = await this.ctx.service.form.create({ formId, formData });
    this.result(data);
  }


  @routerDecorator.post('/del')
  public async del() {
    const { id } = this.ctx.request.body;
    const res = await this.ctx.service.form.del(id);
    this.result(res);
  }


  @routerDecorator.get('/getListByPage')
  public async getListByPage() {
    const { formId } = this.ctx.query;
    const list = await this.ctx.service.form.getListByPage({
      formId,
    });
    // ctx.body = list;
    this.result(list);
  }
}
