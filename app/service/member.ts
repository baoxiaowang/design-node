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
  public async createMember({ userPhone, userName, companyId }: {
    userPhone: string
    userName: string
    companyId: string
  }) {
    return await this.app.mongo.insertOne(this.collectionName, {
      doc: {
        userPhone, // 手机号 作为索引之一
        userName, // 不同人在不同公司可以是不同的名字
        companyId, // 企业id
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
            userPhone,
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

    });

    return res.map(item => {
      return {
        ...item,
        id: item._id,
        _id: undefined,
      };
    });
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
