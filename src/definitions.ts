import type { PermissionState } from '@capacitor/core';

export interface CalendarPlugin {
  checkPermissions(): Promise<PermissionStatus>;
  requestPermissions(): Promise<PermissionStatus>;
  createCalendar(options: CalendarCreateOpts): Promise<Calendar>;
  createEvent(options: EventCreateOpts): Promise<Event>;
  updateEvent(options: EventUpdateOpts): Promise<Event>;
  deleteEvent(options: EventDeleteOpts): Promise<any>;
}

export interface PermissionStatus {
  status: PermissionState;
}

export interface CalendarCreateOpts {
  name: string;
}

export interface EventCreateOpts {
  calendar: string;
  title: string;
  start: Date;
  end: Date;
  location?: {
    name: string;
    lat: number;
    lon: number;
  }
}

export interface EventUpdateOpts {
  event: string;
  title?: string;
  start?: Date;
  end?: Date;
  location?: {
    name: string;
    lat: number;
    lon: number;
  }
}

export interface EventDeleteOpts {
  event: string;
}

export interface Calendar {
  uniqueId: string;
  title: string;
}

export interface Event {
  uniqueId: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  location: {
    name: string;
    lat: number;
    lon: number;
  }
}
