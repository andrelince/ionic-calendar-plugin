import { WebPlugin } from '@capacitor/core';

import type {
  CalendarCreateOpts,
  CalendarPlugin,
  EventCreateOpts,
  EventUpdateOpts,
  PermissionStatus
} from './definitions';

export class CalendarWeb extends WebPlugin implements CalendarPlugin {

  async checkPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async requestPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async createCalendar(options: CalendarCreateOpts): Promise<any> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async createEvent(options: EventCreateOpts): Promise<any> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async updateEvent(options: EventUpdateOpts): Promise<any> {
    throw this.unimplemented('calendar plugin not available on web');
  }
}
