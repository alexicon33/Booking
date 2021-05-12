import { RegistrationPageFormData, User } from '../../Types';

import { db, dbLink } from '../../index';

export async function loadUserById(id: string): Promise<User> {
  return db
    .ref(`users/${id}`)
    .get()
    .then((snapshot) => snapshot.val());
}

export async function loadUsersByIds(ids: string[]): Promise<User[]> {
  ids = ids.filter(id => id !== 'null_id');
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

export async function addUser(userData: RegistrationPageFormData): Promise<User> {
  const userIfDuplicate: User[] = await fetch(`${dbLink}/users.json?orderBy="email"&equalTo="${userData.login}"`)
    .then(res => res.json())
    .then(usersObject => Object.values(usersObject) as User[])

  if (userIfDuplicate.length > 0) {
    throw Error('Такой пользователь уже зарегистрирован');
  }

  let userId: string = '';
  const newUserRef = await db.ref('users').push();
  await newUserRef.get().then(snapshot => {
    userId = snapshot.key || '';
  });

  const userObject: User = {
    id: userId,
    type: userData.userType,
    name: userData.name,
    email: userData.login,
    password: userData.password
  }

  await newUserRef.set(userObject);
  return userObject;
}