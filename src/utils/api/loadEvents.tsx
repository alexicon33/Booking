import { BookingFormData, Event, User } from '../../Types';
import { compareEvents } from '../custom';

export async function loadAllEvents(): Promise<Event[]> {
  return fetch('http://localhost:4000/events').then((response) => response.json());
}

export async function loadEventById(id: number): Promise<Event> {
  return fetch(`http://localhost:4000/events?id=${id}`)
    .then((response) => response.json())
    .then((response) => response[0]);
}

export async function loadEventsByRoom(id: string): Promise<Event[]> {
  return fetch(`http://localhost:4000/events?room=${id}&_limit=3`)
    .then((response) => response.json())
    .then((response) => response.sort(compareEvents));
}

export async function addEvent(formData: BookingFormData, dateString: string, userId?: number) {
  if (userId === undefined) {
    throw Error('no organiser id');
  }

  const eventsInTime: Event[] = await fetch(
    `http://localhost:4000/events?room=${formData.room}&time=${dateString}`
  ).then((res) => res.json());
  if (eventsInTime.length > 0) {
    throw Error('occupied');
  }

  let users: User[] = await fetch('http://localhost:4000/users').then((response) => response.json());
  users = users.filter((user) => formData.participants.includes(user.email));
  const objectToSend: Event = {
    id: Date.now(),
    title: formData.title,
    time: dateString,
    description: formData.description,
    room: formData.room,
    photo: formData.photo,
    organiser: userId,
    participants: users.map((user) => user.id),
  };
  await fetch('http://localhost:4000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(objectToSend),
  });
}
