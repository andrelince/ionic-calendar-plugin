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
  async createCalendar(options: { name: string }): Promise<any> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async createEvent(options: { calendar: string, title: string, start: Date, end: Date, location?: {name: string, lat: number, lon: number} }): Promise<any> {
    throw this.unimplemented('calendar plugin not available on web');
  }
}
