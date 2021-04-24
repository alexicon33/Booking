import { Event } from "../Types";

export function compareEvents(x: Event, y: Event): number {
  return (Date.parse(x.time) < Date.parse(y.time) ? -1 : +1)
}

function prettify(n: number): string {
  return (n < 10 ? '0' + n : n.toString());
}

export function getDateFromString(s: string): string {
  const date: Date = new Date(s);
  return `${prettify(date.getDate())}.${prettify(date.getMonth() + 1)} ${prettify(date.getHours())}:${prettify(date.getMinutes())}`
}

export function selectEvents(events: Event[], room: string) {
  return events.filter(event => event.room === room);
}