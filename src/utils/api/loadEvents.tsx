import { BookingFormData, Event, User } from '../../Types';
import { compareEvents } from '../custom';

import { db, dbLink } from '../../index';

export async function loadAllEvents(): Promise<Event[]> {
  // return fetch('http://localhost:4000/events').then((response) => response.json());
  return fetch(`${dbLink}/events.json`)
    .then((response) => response.json())
    .then((response) => Object.values(response) as Event[])
    .then((eventsArray) => eventsArray.sort(compareEvents));
}

export async function loadEventById(id: string): Promise<Event> {
  // return fetch(`http://localhost:4000/events?id=${id}`)
  //   .then((response) => response.json())
  //   .then((response) => response[0]);
  return db
    .ref(`events/${id}`)
    .get()
    .then((snapshot) => snapshot.val());
}

export async function loadEventsByRoom(id: string): Promise<Event[]> {
  return fetch(`${dbLink}/events.json?orderBy="room"&equalTo="${id}"`)
    .then((response) => response.json())
    .then((response) => Object.values(response) as Event[])
    .then((eventsArray) => eventsArray.sort(compareEvents));
}

export async function addEvent(formData: BookingFormData, dateString: string, userId?: string) {
  if (userId === undefined) {
    throw Error('no organiser id');
  }

  const eventsInTime: Event[] = await fetch(`${dbLink}/events.json?orderBy="time"&equalTo="${dateString}"`)
    .then((res) => res.json())
    .then((res) => Object.values(res) as Event[])
    .then((events) => events.filter((event) => event.room === formData.room));

  if (eventsInTime.length > 0) {
    throw Error('room is occupied');
  }

  let users: User[] = await fetch(`${dbLink}/users.json`)
    .then((response) => response.json())
    .then((usersObject) => Object.values(usersObject) as User[]);
  users = users.filter((user) => formData.participants.includes(user.email));
  // await fetch('http://localhost:4000/events', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8',
  //   },
  //   body: JSON.stringify(objectToSend),
  // });
  let eventId: string = '';
  const newEventRef = await db.ref('events').push();
  await newEventRef.get().then(snapshot => {
    eventId = snapshot.key || '';
  });

  const objectToSend: Event = {
    id: eventId,
    title: formData.title,
    time: dateString,
    description: formData.description,
    room: formData.room,
    photo: formData.photo,
    organiser: userId,
    participants: users.map((user) => user.id),
  };
  await newEventRef.set(objectToSend);
}
