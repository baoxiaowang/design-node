import { ObjectID } from 'bson';
import { Service } from 'egg';

interface IGetMember {
  userName? :string
  deptId?: string
  userPhone?: string
}
export default class MemberService extends Service {
  get collectionName() {
    return 'member';
  }

  /**
   * createMember
   */
  public async createMember({ phone, name, companyId, dept = [], email, jobNum }: {
    phone: string
    name: string
    companyId: string
    email?: string,
    jobNum?: string,
    dept?: string[]
  }) {
    return await this.app.mongo.insertOne(this.collectionName, {
      doc: {
        phone, // 手机号 作为索引之一
        name, // 不同人在不同公司可以是不同的名字
        companyId, // 企业id
        dept, // 部门
        email,
        jobNum,
      },
    });
  }

  /**
   * getCompanyByUserPhone
   */
  public async getCompanyByUserPhone({ userPhone }: {
    userPhone: string
  }) {
    const relationCompanyList = await this.app.mongo.aggregate(this.collectionName, {
      pipeline: [
        {
          $match: {
            phone: userPhone,
          },
        },
        {
          $lookup: {
            from: 'company', // 连接表
            localField: 'companyId', // 主表关联字段
            foreignField: '_id', // 连接表关联字段
            as: 'companyInfo', // 别名，数组形式显示
          },
        },
        {
          $unwind: '$companyInfo',
        },
      ],
    });
    return relationCompanyList;
  }


  public async getMember({ userName, deptId, userPhone }: IGetMember) {
    const query: any = {};
    if (userName) {
      query.userName = userName;
    }
    if (deptId !== undefined && deptId !== '0') {
      query.dept = {
        $elemMatch: {
          $eq: deptId,
        },
      };
    }
    if (userPhone) {
      query.userPhone = userPhone;
    }
    const res = await this.app.mongo.find(this.collectionName, {
      query,
      limit: 10,
      project: {
        _id: 1,
        id: '$_id',
        name: 1,
        phone: 1,
        email: 1,
        jobNum: 1,
      },
    });

    return res;
  }

  public async getMemberByIds(memberIds: string[] = []) {
    const res = await this.app.mongo.find(this.collectionName, {
      query: {
        _id: {
          $in: memberIds.map(item => new ObjectID(item)),
        },
      },
    });
    return res.map(item => {
      return {
        ...item,
        id: item._id,
        _id: undefined,
      };
    });
  }


}
