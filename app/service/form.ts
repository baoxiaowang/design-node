import { ObjectID } from 'bson';
import { Service } from 'egg';

/**
 * ApplicationService Service
 */
export default class extends Service {
  prefix = 'form';

  get collectionName() {
    return `${this.prefix}_${this.ctx.companyId}`;
  }

  /**
   * @param data
   * @return
   */
  public async create(data: {
    formId: string,
    formData: Record<string, any>
  }) {
    console.log(data, '$$$');
    const result = await this.app.mongo.insertOne(this.collectionName, {
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
  public async getListByPage({
    formId,
  }: {
    formId: string
  }) {
    console.log('collectionName', this.collectionName);
    const result = await this.app.mongo.find(this.collectionName, {
      query: {
        formId,
      },
    });
    console.log(this.ctx.companyId);
    return result.map((item: any) => {
      return {
        id: item._id,
        ...item.formData,
      };
    });
  }

  /**
   *
   * @return
   */
  public async getListByKey({
    formId,
    widgetKey,
    word,
  }: {
    formId: string,
    widgetKey: string,
    word: string,
  }) {
    console.log('widgetKey', widgetKey);
    const result = await this.app.mongo.find(this.collectionName, {
      query: {
        formId,
        [`formData.${widgetKey}`]: new RegExp(word),
      },
      project: {
        formData: {
          [widgetKey]: 1,
        },
      },
    });
    console.log(this.ctx.companyId);
    return result.map((item: any) => {
      return {
        id: item._id,
        value: item.formData[widgetKey],
        label: item.formData[widgetKey],
      };
    });
  }
}
