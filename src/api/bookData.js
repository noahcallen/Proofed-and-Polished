'use client';

import { clientCredentials } from '../utils/client';
import { getDatabase, ref, set, push, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const endpoint = clientCredentials.databaseURL;
const db = getDatabase();
const auth = getAuth();

const getBooks = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  const token = await user.getIdToken();

  const response = await fetch(`${endpoint}/books.json?auth=${token}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch books: ' + response.statusText);
  }

  const data = await response.json();
  if (!data) return [];

  return Object.entries(data).map(([firebaseKey, value]) => ({
    ...value,
    firebaseKey,
  }));
};

const createBook = async (bookData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const newBookRef = push(ref(db, 'books'));
    const newBookKey = newBookRef.key;

    const bookWithKey = { ...bookData, firebaseKey: newBookKey };
    await set(newBookRef, bookWithKey);
    return bookWithKey;
  } catch (error) {
    console.error('Error creating book:', error);
    return null;
  }
};

const updateBook = async (firebaseKey, updatedData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const token = await user.getIdToken();

  const response = await fetch(`${endpoint}/books/${firebaseKey}.json?auth=${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Failed to update book: ' + response.statusText);
  }

  return response.json();
};

const deleteBook = async (bookId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const bookRef = ref(db, `books/${bookId}`);
    await remove(bookRef);
  } catch (error) {
    console.error('Error deleting book:', error);
  }
};

const getSingleBook = async (firebaseKey) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  const token = await user.getIdToken();

  const response = await fetch(`${endpoint}/books/${firebaseKey}.json?auth=${token}`);
  const data = await response.json();
  return data;
};

export { getBooks, createBook, updateBook, deleteBook, getSingleBook };
