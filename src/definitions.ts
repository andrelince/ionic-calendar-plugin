import type { PermissionState } from '@capacitor/core';

export interface CalendarPlugin {
  checkPermissions(): Promise<PermissionStatus>;
  requestPermissions(): Promise<PermissionStatus>;
  createCalendar(options: CalendarCreateOpts): Promise<any>;
  createEvent(options: EventCreateOpts): Promise<any>;
  updateEvent(options: EventUpdateOpts): Promise<any>;
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
