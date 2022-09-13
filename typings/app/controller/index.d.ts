// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApplication from '../../../app/controller/application';
import ExportBase from '../../../app/controller/base';
import ExportForm from '../../../app/controller/form';
import ExportPage from '../../../app/controller/page';
import ExportUpload from '../../../app/controller/upload';
import ExportWidget from '../../../app/controller/widget';

declare module 'egg' {
  interface IController {
    application: ExportApplication;
    base: ExportBase;
    form: ExportForm;
    page: ExportPage;
    upload: ExportUpload;
    widget: ExportWidget;
  }
}
