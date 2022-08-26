import type { PermissionState } from '@capacitor/core';

export interface CalendarPlugin {
  checkPermissions(): Promise<PermissionStatus>;
  requestPermissions(): Promise<PermissionStatus>;
  createCalendar(options: { name: string }): Promise<void>;
}

export interface PermissionStatus {
  status: PermissionState;
}
