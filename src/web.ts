import { WebPlugin } from '@capacitor/core';

import type { CalendarPlugin } from './definitions';

export class CalendarWeb extends WebPlugin implements CalendarPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
