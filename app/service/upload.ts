// service/qiniu.js
import { Service } from 'egg';
// import fs from 'fs';
import path from 'path';
import qiniu from 'qiniu';
import md5 from 'md5';

// 需要填写你的 Access Key 和 Secret Key , bucket空间
const accessKey = 'JpX7wsA8DsepGqiCbsdi0gXKfRPehl903rZyHnz6';
const secretKey = '32jrPExQYfEPGznZvCTHELwO_RqjG3VrKfvJop8S';
const bucket = 'neeko-design';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
// config.zone = qiniu.zone.Zone_z0; // 空间对应的机房

const options = {
  scope: bucket,
  expires: 7200,
  force: true,
  callbackBodyType: 'application/json',
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

class QiniuUploadService extends Service {
  async uploadFiles(data) {
    const timestamp = (new Date()).getTime(); // 当前时间戳
    const randomNum = Math.ceil(Math.random() * 1000); // 取1000以下的随机数

    try {
      const stream = await data.getFileStream(); // 文件不存在将响应400错误
      const extname = path.extname(stream.filename).toLocaleLowerCase();
      const filename = md5(path.basename(stream.filename, extname) + timestamp + randomNum) + extname;
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();

      const result = await new Promise((resolve, reject) => {
        formUploader.putStream(uploadToken, filename, stream, putExtra, function(respErr, respBody, respInfo) {
          console.log('respInfo', respInfo);
          if (respErr) {
            throw respErr;
          }
          if (respInfo.statusCode === 200) {
            resolve({
              ...respBody,
              url: 'http://cdn.neeko-design.com/' + respBody.key,
            });
          } else {
            reject(respBody);
          }
        });
      });

      if (result !== '') {
        return {
          data: result,
        };
      }
      return false;

    } catch (err) {
      console.log('err', err);
      return false;
    }
  }
}
export default QiniuUploadService;
