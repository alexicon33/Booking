import { User } from '../../Types';

export async function loadUserById(id: number): Promise<User> {
  return fetch(`http://localhost:4000/users?id=${id}`)
    .then((response) => response.json())
    .then((response) => response[0]);
}

export async function loadUsersByIds(ids: number[]): Promise<User[]> {
  return Promise.all(ids.map((id) => loadUserById(id)));
}

export async function loadUser(login: string, password: string): Promise<User> {
  const userData: User[] = await fetch(`http://localhost:4000/users?email=${login}&password=${password}`).then(res => res.json());
  if (userData.length === 0) {
    throw Error('no users');
  }
  return userData[0];
}
