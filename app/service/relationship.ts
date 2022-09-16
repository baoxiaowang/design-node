// import { ObjectID } from 'bson';
import { Service } from 'egg';


export default class extends Service {
  get collectionName() {
    return 'relationship';
  }

  /**
   * getCompanyByUserPhone
   */
  public async getCompanyByUserPhone() {
    return [];
  }
}
