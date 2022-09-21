import { ObjectID } from 'bson';
import { Service } from 'egg';

/**
 * ApplicationService Service
 */
export default class ApplicationService extends Service {
  prefix = 'applications';

  get collectionName() {
    return this.prefix;
  }

  /**
   * @param data
   * @return
   */
  public async create(data: {
    name: string,
    icon: string,
    describe: string,
    tags: string[]
  }) {
    const result = this.app.mongo.insertOne(this.collectionName, {
      doc: {
        ...data,
        companyId: this.ctx.companyId,
      },
    });
    return result;
  }

  /**
   * name
   */
  public async del(id: string) {
    return await this.app.mongo.findOneAndDelete(this.collectionName, {
      filter: {
        _id: new ObjectID(id),
      },
    });
  }

  /**
   *
   * @return
   */
  public async getListByPage() {
    console.log('collectionName', this.collectionName);
    const result = this.app.mongo.find(this.collectionName, {
      query: {
        companyId: this.ctx.companyId,
      },
      project: {
        _id: 1,
        id: { $toString: '$_id' },
        name: 1,
        icon: 1,
        describe: 1,
        tags: 1,
      },
    });
    console.log(this.ctx.companyId);
    return result;
  }

}
