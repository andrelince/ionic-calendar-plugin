import type { PermissionState } from '@capacitor/core';

export interface CalendarPlugin {
  checkPermissions(): Promise<PermissionStatus>;
  requestPermissions(): Promise<PermissionStatus>;
  createCalendar(options: { name: string }): Promise<any>;
  createEvent(options: { calendar: string, title: string, start: Date, end: Date, location?: {name: string, lat: number, lon: number} }): Promise<any>;
}

export interface PermissionStatus {
  status: PermissionState;
}
