import BaseController from './base';

export default class extends BaseController {
  async uploadFiles() {
    const ctx = this.ctx;
    const result = await ctx.service.upload.uploadFiles(ctx);
    if (result) {
      ctx.body = result;
    } else {
      ctx.body = {
        message: '上传失败',
      };
    }
  }
}
