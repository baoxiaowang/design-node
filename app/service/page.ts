import { Service } from 'egg';
import { ObjectID } from 'bson';

enum PageTypeEnum {
  pc = 1,
  mobile = 2,
  form = 3,
  processForm = 4,
  link = 5,
}
/**
 * ApplicationService Service
 */
export default class ApplicationService extends Service {
  prefix = 'page';

  get collectionName() {
    return this.prefix;
  }

  /**
   * @param data
   * @return
   */
  public async create(data: {
    name: string
    widgets: any[]
    appId: string
    pageType: number;
  }) {
    const { insertedCount, insertedId } = await this.app.mongo.insertOne(this.collectionName, {
      doc: {
        ...data,
        pageType: +data.pageType,
        companyId: this.ctx.companyId,
      },
    });
    return {
      insertedCount,
      insertedId,
    };
  }

  public async updateWidget(data: {
    id: string
    widgets: any[]
  }) {
    const { id, widgets } = data;
    console.log(id, widgets, '@###');
    const res = await this.app.mongo.findOneAndUpdate(this.collectionName, {
      filter: {
        _id: new ObjectID(id),
      },
      update: {
        $set: {
          widgets,
        },
      },
    });
    return res;
  }

  public async updatePageName(data: {
    id: string,
    name: string,
  }) {
    const { id, name } = data;
    const res = await this.app.mongo.findOneAndUpdate(this.collectionName, {
      filter: {
        _id: new ObjectID(id),
      },
      update: {
        $set: {
          name,
        },
      },
    });
    return res;
  }


  public async del(id: string) {
    const result = await this.app.mongo.findOneAndDelete(this.collectionName, {
      filter: {
        _id: new ObjectID(id),
      },
    });
    return result;
  }

  public async getById(id: string) {
    const result = await this.app.mongo.findOne(this.collectionName, {
      query: {
        _id: new ObjectID(id),
      },
    });
    return result;
  }

  public async getByAppId(appId: string) {
    const result = await this.app.mongo.findOne(this.collectionName, {
      query: {
        appId,
      },
    });
    return result;
  }

  /**
   *
   * @return
   */
  public async getListByPage(query: {
    appId: string;
    name: string;
    pageType: PageTypeEnum;
  }) {
    console.log('@@', query);
    const result = await this.app.mongo.find(this.collectionName, {
      query,
      projection: {
        _id: 0,
        name: 1,
        appId: 1,
        pageType: 1,
        id: '$_id',
      },
    });
    console.log(this.ctx.companyId);
    return result;
  }
}
