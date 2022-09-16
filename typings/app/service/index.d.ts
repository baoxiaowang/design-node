// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportApplication from '../../../app/service/application';
import ExportCompany from '../../../app/service/company';
import ExportForm from '../../../app/service/form';
import ExportPage from '../../../app/service/page';
import ExportRelationship from '../../../app/service/relationship';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';
import ExportWidget from '../../../app/service/widget';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    application: AutoInstanceType<typeof ExportApplication>;
    company: AutoInstanceType<typeof ExportCompany>;
    form: AutoInstanceType<typeof ExportForm>;
    page: AutoInstanceType<typeof ExportPage>;
    relationship: AutoInstanceType<typeof ExportRelationship>;
    upload: AutoInstanceType<typeof ExportUpload>;
    user: AutoInstanceType<typeof ExportUser>;
    widget: AutoInstanceType<typeof ExportWidget>;
  }
}
