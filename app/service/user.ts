// import { ObjectID } from 'bson';
import { Service } from 'egg';


export default class extends Service {
  get collectionName() {
    return 'user';
  }
  /**
   * createCompany
   */
  public async userRegister({ name, phone, password }: {
    name: string,
    phone: string,
    password: string
  }) {
    this.app.mongo.insertOne(this.collectionName, {
      doc: {
        test: '33',
        name,
        phone,
        password,
      },
    });
  }

  /**
   * login
   */
  public async userLogin({ phone, password }: {
    phone: string,
    password: string
  }) {
    //
    const user = await this.app.mongo.findOne(this.collectionName, {
      query: {
        phone,
        password,
      },
    });
    if (user) {
      const companyList = await this.service.relationship.getCompanyByUserPhone();
      return companyList;
    }
    return false;

  }
}
