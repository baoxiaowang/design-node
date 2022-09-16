// import { ObjectID } from 'bson';
import { Service } from 'egg';


export default class extends Service {

  get collectionName() {
    return 'company';
  }
  /**
   * createCompany
   */
  public async createCompany() {
    this.app.mongo.insertOne(this.collectionName, {
      doc: {
        name: '', // 公司名称
        staffList: [],
      },
    });
  }
}
