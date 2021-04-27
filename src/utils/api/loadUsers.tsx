import { User } from '../../Types';

import { db, dbLink } from '../../index';

export async function loadUserById(id: string): Promise<User> {
  // return fetch(`http://localhost:4000/users?id=${id}`)
  //   .then((response) => response.json())
  //   .then((response) => response[0]);
  return db
    .ref(`users/${id}`)
    .get()
    .then((snapshot) => snapshot.val());
}

export async function loadUsersByIds(ids: string[]): Promise<User[]> {
  return Promise.all(ids.map((id) => loadUserById(id)));
}

export async function loadUser(login: string, password: string): Promise<User> {
  const userData: User[] = await fetch(`${dbLink}/users.json?orderBy="email"&equalTo="${login}"`)
    .then(res => res.json())
    .then(usersObject => Object.values(usersObject) as User[])
  
  if (userData.length === 0) {
    throw Error('wrong login');
  }

  if (userData[0].password !== password) {
    throw Error('wrong password');
  }

  return userData[0];
}
