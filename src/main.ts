import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import moment from 'moment';
import 'moment/locale/id';

import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';

registerLocaleData(localeId);

moment.locale('id');

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
