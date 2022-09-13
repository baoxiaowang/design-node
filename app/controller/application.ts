import BaseController from './base';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/application')
export default class extends BaseController {
  public async getList() {
    const { ctx } = this;
    // ctx.body = await ctx.service.test.sayHi('egg');
    // ctx.body = ctx.model.Pages.find({});
    ctx.model.Page.create({
      name: '测试331' + Date.now(),
    });
  }

  public async getById() {
    const { ctx } = this;
    // ctx.model.Page.findById('');
    ctx.body = { id: 'ApplicationController' };
  }

  /**
   * create
   * 创建应用
   */
  public async create() {
    //
    console.log('##', this.ctx.request.body);
    const { name = '', icon = '', describe = '', tags = [] } = this.ctx.request.body;
    const data = await this.ctx.service.application.create({ name, icon, describe, tags });
    this.result(data);
  }


  public async del() {
    //
    const { id } = this.ctx.request.body;
    console.log('@@', this.ctx.request.body);
    const res = await this.ctx.service.application.del(id);
    this.result(res);
  }

  /**
   * name
   */
  public async getListByPage() {
    const list = await this.ctx.service.application.getListByPage();
    // ctx.body = list;
    this.result(list);
  }
}
