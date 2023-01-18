import BaseController from './base';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/template')
export default class TemplateController extends BaseController {

  public async del() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const data = await this.ctx.service.template.del(id);
    this.result(data);
  }


  public async getById() {
    const { ctx } = this;
    const { id } = ctx.query;
    const data = await this.ctx.service.template.getById(id);
    this.result(data);
  }

  public async getByAppId() {
    const { ctx } = this;
    const { appId } = ctx.query;
    const data = await this.ctx.service.template.getByAppId(appId);
    this.result(data);
  }


  /**
   * create
   * 创建应用
   */
  public async create() {
    //
    const { name = '未命名页面', widgets = [], appId, pageType } = this.ctx.request.body;
    const data = await this.ctx.service.template.create({ appId, name, widgets, pageType });
    this.result(data);
  }

  public async updateWidget() {
    //
    const { id, widgets = [] } = this.ctx.request.body;
    const data = await this.ctx.service.template.updateWidget({ id, widgets });
    this.result(data);
  }

  @routerDecorator.post('/updateName')
  public async updateName() {
    const { id, name } = this.ctx.request.body;
    const data = await this.ctx.service.template.updatePageName({ id, name });
    this.result(data);
  }

  /**
   * name
   */
  @routerDecorator.get('/getListByPage')
  public async getListByPage() {
    const { query } = this.ctx;
    const list = await this.ctx.service.template.getListByPage(query as any);
    this.result(list);
  }
}
