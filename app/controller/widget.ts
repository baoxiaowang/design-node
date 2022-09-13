import BaseController from './base';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/widget')
export default class extends BaseController {
  /**
   * getAppWidget
   */
  @routerDecorator.get('/getAppLinkWidget')
  public async getAppLinkWidget() {
    const data = await this.ctx.service.widget.getWidgetsOptionLink();
    this.result(data);
  }
}
