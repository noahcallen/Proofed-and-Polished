import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllUsers = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${uid}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllUsers, getSingleUser };
