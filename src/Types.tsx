import { FormEventHandler } from "react";

export type Event = {
  id: number,
  title: string,
  time: string,
  description?: string,
  room: string,
  photo?: string,
  organiser: number,
  participants: number[]
}

export type EventId = {
  eventId: string
}

export type UserType = 'admin' | 'user';

export type User = {
  id: number,
  type: UserType,
  name: string,
  email: string,
  password: string
}

export type RoomType = 'lecture' | 'seminar';

export type Room = {
  id: string,
  type: RoomType,
  photo: string
}

export type ButtonProps = {
  text: string,
  onClick?: FormEventHandler,
  link?: string
}

export type LoginPageFormData = {
  login: string,
  password: string
}

export type BookingFormData = {
  title: string;
  time: string;
  date: string;
  description?: string;
  photo?: string;
  participants: string;
  room: string;
}