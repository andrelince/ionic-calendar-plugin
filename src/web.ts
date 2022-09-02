import { WebPlugin } from '@capacitor/core';

import type {
  ICalendar,
  CalendarCreateOpts,
  CalendarPlugin,
  IEvent,
  EventCreateOpts,
  EventUpdateOpts,
  PermissionStatus,
  EventDeleteOpts,
  Results,
  EventListOpts,
} from './definitions';

export class CalendarWeb extends WebPlugin implements CalendarPlugin {
  async checkPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async requestPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async createCalendar(options: CalendarCreateOpts): Promise<ICalendar> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async createEvent(options: EventCreateOpts): Promise<IEvent> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async updateEvent(options: EventUpdateOpts): Promise<IEvent> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async deleteEvent(options: EventDeleteOpts): Promise<any> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  listCalendars(): Promise<Results<ICalendar>> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  listEvents(options: EventListOpts): Promise<Results<IEvent>> {
    throw this.unimplemented('calendar plugin not available on web');
  }
}
