// import { ObjectID } from 'bson';
import { Service } from 'egg';

interface LoginResult {
  login: boolean,
  token?: string,
  companyToken?: string
  companyList?: any[]
}

export default class extends Service {
  get collectionName() {
    return 'user';
  }

  public async getLoginUserInfo({ userPhone, companyId }) {
    const [
      account,
      companyInfo,
      companyList,
    ] = await Promise.all([
      this.getUserByPhone(userPhone),
      this.service.company.getCompanyById(companyId),
      this.service.member.getCompanyByUserPhone({ userPhone }),
    ]);
    console.log('#####', companyInfo);
    return {
      name: account.name,
      phone: account.phone,
      companyId,
      companyName: companyInfo?.companyName,
      companyList,
    };
  }
  /**
   * createCompany
   * 注册用户 - 没填企业名称 - 查询成功后查询所在企业 - 没有就提示创建企业
   */
  public async userRegister({ companyName, name, phone, password }: {
    companyName?: string;
    name: string,
    phone: string,
    password: string
  }) {
    try {
      await this.app.mongo.insertOne(this.collectionName, {
        doc: {
          name,
          phone,
          password,
        },
      });
      if (companyName) {
        const companyId = await this.service.company.createCompany({
          companyName,
        });
        await this.service.member.createMember({
          name,
          phone,
          companyId,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * login
   */
  public async userLogin({ phone, password }: {
    phone: string,
    password: string
  }): Promise<[boolean, LoginResult, string]> {
    const account = await this.getUserByPhone(phone);
    console.log(account, 'hasAccount');
    if (!account) {
      return [ false, { login: false }, '该手机号未注册' ];
    }
    // 校验密码
    // const user = await this.app.mongo.findOne(this.collectionName, {
    //   query: {
    //     phone,
    //     password,
    //   },
    // });
    console.log('account', account);
    const validate = account.password === password;
    if (validate) {
      const companyList = await this.service.member.getCompanyByUserPhone({ userPhone: phone });
      const token = this.app.jwt.sign({
        ...account,
      }, this.app.config.jwt.secret, { expiresIn: '8h' });
      return [ true, { login: true, token, companyList }, '登录成功' ];
    }
    return [ false, { login: false }, '账号或者密码错误' ];
  }

  /**
   * getUserByPhone
   */
  public async getUserByPhone(phone: string) {
    const user = await this.app.mongo.findOne(this.collectionName, {
      query: {
        phone,
      },
      options: {
        projection: {
          _id: 0,
        },
      },
    });
    return user;
  }
}
