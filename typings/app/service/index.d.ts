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
import ExportDept from '../../../app/service/dept';
import ExportForm from '../../../app/service/form';
import ExportMember from '../../../app/service/member';
import ExportPage from '../../../app/service/page';
import ExportRelation from '../../../app/service/relation';
import ExportTemplate from '../../../app/service/template';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';
import ExportWidget from '../../../app/service/widget';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    application: AutoInstanceType<typeof ExportApplication>;
    company: AutoInstanceType<typeof ExportCompany>;
    dept: AutoInstanceType<typeof ExportDept>;
    form: AutoInstanceType<typeof ExportForm>;
    member: AutoInstanceType<typeof ExportMember>;
    page: AutoInstanceType<typeof ExportPage>;
    relation: AutoInstanceType<typeof ExportRelation>;
    template: AutoInstanceType<typeof ExportTemplate>;
    upload: AutoInstanceType<typeof ExportUpload>;
    user: AutoInstanceType<typeof ExportUser>;
    widget: AutoInstanceType<typeof ExportWidget>;
  }
}
