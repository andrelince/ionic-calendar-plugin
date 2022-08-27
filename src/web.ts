import { WebPlugin } from '@capacitor/core';

import type {
  Calendar,
  CalendarCreateOpts,
  CalendarPlugin,
  Event,
  EventCreateOpts,
  EventUpdateOpts,
  PermissionStatus
} from './definitions';
import {EventDeleteOpts} from "./definitions";

export class CalendarWeb extends WebPlugin implements CalendarPlugin {

  async checkPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async requestPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async createCalendar(options: CalendarCreateOpts): Promise<Calendar> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async createEvent(options: EventCreateOpts): Promise<Event> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async updateEvent(options: EventUpdateOpts): Promise<Event> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async deleteEvent(options: EventDeleteOpts): Promise<any> {
    throw this.unimplemented('calendar plugin not available on web');
  }
}
