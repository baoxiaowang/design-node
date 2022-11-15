// 组织部门管理
import BaseController from './base';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/dept')
export default class DeptController extends BaseController {
  /**
   * create
   * 创建表单数据
   */
  @routerDecorator.post('/create')
  public async create() {
    const { deptName, parentDeptId = '0' } = this.ctx.request.body;
    const data = await this.ctx.service.dept.create({ name: deptName, parentId: parentDeptId });
    this.result(data);
  }

  @routerDecorator.get('/getAllDept')
  public async getAllDept() {
    const data = await this.ctx.service.dept.getAllDept();
    this.result(data);
  }

  @routerDecorator.get('/getAllDeptTree')
  public async getAllDeptTree() {
    const data = await this.ctx.service.dept.getAllDeptTree();
    this.result(data);
  }

  @routerDecorator.get('/getDeptByIds')
  public async getDeptByIds() {
    const { ids = '' } = this.ctx.query;
    const idList: string[] = ids.split(',');
    const data = await this.ctx.service.dept.getDeptByIds(idList);
    this.result(data);
  }
}
