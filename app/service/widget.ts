// import { ObjectID } from 'bson';
import { Service } from 'egg';

/**
 * ApplicationService Service
 */
export default class ApplicationService extends Service {
  prefix = 'applications';
  /**
   * getWidgetsOptionLink
   * 处理查询下拉框选项可以关联到的字段
   * app => 表单 => widgets
   */
  public async getWidgetsOptionLink() {
    const result = await this.app.mongo.aggregate(this.prefix, {
      pipeline: [
        {
          $addFields: {
            _id: { $toString: '$_id' },
            // i tried to change it into objectID so i could $lookup it
          },
        },
        {
          $lookup: {
            from: 'page', // 连接表
            localField: '_id', // 主表关联字段
            foreignField: 'appId', // 连接表关联字段
            as: 'children', // 别名，数组形式显示
          },
        },
      ],
      options: {

      },
    });
    const widgetOptions = result.map(item => {
      const pageList = item.children.map(page => {
        const [ formWidget ] = page.widgets || [];
        const widgetChildren = (formWidget?.children || []).filter(widget => {
          return [ 'input' ].includes(widget.type);
        }).map(widget => {
          return {
            label: widget.label,
            value: widget.key,
            type: widget.type,
          };
        });
        return {
          value: page._id,
          label: page.name,
          children: widgetChildren,
        };
      });

      return {
        value: item._id,
        label: item.name,
        children: pageList,
      };
    });
    return widgetOptions;
  }
}
