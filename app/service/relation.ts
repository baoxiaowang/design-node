// import { ObjectID } from 'bson';
import { Service } from 'egg';


export default class extends Service {
  get collectionName() {
    return 'relation';
  }

  /**
   * createRelation
   */
  public async createRelation({ userPhone, userName, companyId }: {
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
}
