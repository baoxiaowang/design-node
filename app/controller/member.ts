// 组织部门管理
import BaseController from './base';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/member')
export default class MemberController extends BaseController {

  @routerDecorator.get('/getMemberByPage')
  public async getMemberByPage() {
    const { userName, deptId } = this.ctx.query;
    const data = await this.ctx.service.member.getMember({ userName, deptId });
    this.result(data);
  }

  @routerDecorator.get('/getMemberByIds')
  public async getMemberByIds() {
    const { memberIds = '' } = this.ctx.query;
    const data = await this.ctx.service.member.getMemberByIds(memberIds.split(','));
    this.result(data);
  }

  @routerDecorator.post('/createMember')
  public async createMember() {
    // (this.ctx as any).validator({
    //   phone: 'string',
    //   name: 'string',
    // });
    const { companyId } = this.ctx;
    const { name = '', phone, email, dept = [], jobNum } = this.ctx.request.body;
    console.log('body', this.ctx.request.body, companyId);
    const data = await this.ctx.service.member.createMember({
      name,
      phone,
      companyId,
      dept,
      email,
      jobNum,
    });
    this.result(data);
  }
}
