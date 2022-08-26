import { WebPlugin } from '@capacitor/core';

import type {CalendarPlugin, PermissionStatus} from './definitions';

export class CalendarWeb extends WebPlugin implements CalendarPlugin {

  async checkPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async requestPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async createCalendar(options: { name: string }): Promise<void> {
    throw this.unimplemented('calendar plugin not available on web');
  }
}
