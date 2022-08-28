import { WebPlugin } from '@capacitor/core';

import type {
  Calendar,
  CalendarCreateOpts,
  CalendarPlugin,
  Event,
  EventCreateOpts,
  EventUpdateOpts,
  PermissionStatus,
  EventDeleteOpts,
} from './definitions';

/* eslint-disable @typescript-eslint/no-unused-vars */
export class CalendarWeb extends WebPlugin implements CalendarPlugin {
  async checkPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async requestPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async createCalendar(options: CalendarCreateOpts): Promise<Calendar> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async createEvent(options: EventCreateOpts): Promise<Event> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async updateEvent(options: EventUpdateOpts): Promise<Event> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async deleteEvent(options: EventDeleteOpts): Promise<any> {
    throw this.unimplemented('calendar plugin not available on web');
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
