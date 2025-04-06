'use client';

import React, { useEffect, useState } from 'react';
import { getSingleBook } from '@/api/bookData';
import BookForm from '@/components/forms/BookForm';
import PropTypes from 'prop-types';

export default function EditBook({ params }) {
  const [editItem, setEditItem] = useState(null);
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleBook(firebaseKey).then((book) => {
      console.log('📘 Book fetched from Firebase:', book); // 👈 Add this
      if (!book.firebaseKey) book.firebaseKey = firebaseKey;
      setEditItem(book);
    });
  }, [firebaseKey]);
  

  if (!editItem) return <div className="text-white text-center">Loading...</div>;

  return <BookForm obj={editItem} />;
}

EditBook.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};