import { Event } from "../Types";

export function compareEvents(x: Event, y: Event): number {
  return (Date.parse(x.start) < Date.parse(y.start) ? -1 : +1)
}

function prettify(n: number): string {
  return (n < 10 ? '0' + n : n.toString());
}

export function getDateFromString(s: string): string {
  const date: Date = new Date(s);
  return `${prettify(date.getDate())}.${prettify(date.getMonth() + 1)}`;
}

export function getTimeFromString(s: string): string {
  const date: Date = new Date(s);
  return `${prettify(date.getHours())}:${prettify(date.getMinutes())}`;
}

export function selectEvents(events: Event[], room: string): Event[] {
  return events.filter(event => event.room === room);
}

export function getISOstring(date: string, time: string): string {
  const dateDays = new Date(date);
  const dateTime = new Date(time);
  return new Date(dateDays.getFullYear(), dateDays.getMonth(), dateDays.getDate(), 
                                dateTime.getHours(), dateTime.getMinutes()).toISOString();
}