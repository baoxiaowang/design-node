import { ObjectID } from 'bson';
import { Service } from 'egg';

export default class DeptService extends Service {
  prefix = 'dept';

  get collectionName() {
    return `${this.prefix}`;
  }

  public async create(data: {
    name: string,
    parentId: string,
  }) {
    // 插入一个部门
    return await this.app.mongo.insertOne(this.collectionName, {
      doc: {
        name: data.name,
        parentId: data.parentId,
      },
    });
  }

  public async getAllDept() {
    // 插入一个部门
    // return await this.app.mongo.aggregate(this.collectionName, {
    //   pipeline: [
    //     {
    //       $addFields: {
    //         _id: { $toString: '$_id' },
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'dept', // 连接表
    //         localField: '_id', // 主表关联字段
    //         foreignField: 'parentId', // 连接表关联字段
    //         as: 'children', // 别名，数组形式显示
    //       },
    //     },
    //     {
    //       $match: {
    //         parentId: '0',
    //       },
    //     },
    //   ],
    // });
    const deptList = await this.app.mongo.find(this.collectionName, {
      query: {
      },
      project: {
        _id: 1,
        id: '$_id',
        parentId: 1,
        name: 1,
      },
    });
    return deptList;
  }

  /**
   * getAllDeptTree
   */
  public async getAllDeptTree() {
    const deptList = await this.app.mongo.find(this.collectionName, {
      query: {
      },
      project: {
        _id: 0,
        id: '$_id',
        parentId: 1,
        name: 1,
      },
    });
    console.log('deptList', deptList);
    const treeData = deptList.reduce(function(p, b, _index, data) {
      if (b.parentId === '0' || !b.parentId) {
        p.push(b);
        return p;
      }
      data.some(item => {
        if (b.parentId?.toString() === item.id?.toString()) {
          item.children = item.children ? item.children.concat(b) : [ b ];
          return true;
        }
        return false;
      });
      return p;
    }, []);
    return treeData;
  }


  public async getDeptByIds(ids: string[]) {
    if (ids.length === 0) return [];
    const deptList = await this.app.mongo.find(this.collectionName, {
      query: {
        _id: {
          $in: ids.map(item => new ObjectID(item)),
        },
      },
      project: {
        _id: 1,
        id: '$_id',
        parentId: 1,
        name: 1,
      },
    });
    return deptList;
  }
}
