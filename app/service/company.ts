// import { ObjectID } from 'bson';
import { Service } from 'egg';
import { ObjectID } from 'bson';
import { InsertOneWriteOpResult } from 'mongodb';


export default class extends Service {

  get collectionName() {
    return 'company';
  }
  /**
   * createCompany
   */
  public async createCompany({ companyName }) {
    const data: InsertOneWriteOpResult<any> = await this.app.mongo.insertOne(this.collectionName, {
      doc: {
        companyName, // 公司名称
      },
    });

    console.log('createCompany', data);
    return data.insertedId;
  }

  /**
   * getCompanyById
   */
  public async getCompanyById(id: string): Promise<any> {
    const company = await this.app.mongo.findOne(this.collectionName, {
      query: {
        _id: new ObjectID(id),
      },
    });
    return company;
  }
}
