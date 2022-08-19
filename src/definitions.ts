export interface CalendarPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
