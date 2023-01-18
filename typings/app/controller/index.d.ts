// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApplication from '../../../app/controller/application';
import ExportBase from '../../../app/controller/base';
import ExportCompany from '../../../app/controller/company';
import ExportDept from '../../../app/controller/dept';
import ExportForm from '../../../app/controller/form';
import ExportMember from '../../../app/controller/member';
import ExportPage from '../../../app/controller/page';
import ExportTemplate from '../../../app/controller/template';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';
import ExportWidget from '../../../app/controller/widget';

declare module 'egg' {
  interface IController {
    application: ExportApplication;
    base: ExportBase;
    company: ExportCompany;
    dept: ExportDept;
    form: ExportForm;
    member: ExportMember;
    page: ExportPage;
    template: ExportTemplate;
    upload: ExportUpload;
    user: ExportUser;
    widget: ExportWidget;
  }
}
