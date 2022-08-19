import { registerPlugin } from '@capacitor/core';

import type { CalendarPlugin } from './definitions';

const Calendar = registerPlugin<CalendarPlugin>('Calendar', {
  web: () => import('./web').then(m => new m.CalendarWeb()),
});

export * from './definitions';
export { Calendar };
