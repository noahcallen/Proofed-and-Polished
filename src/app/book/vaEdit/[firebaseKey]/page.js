'use client';

import React, { useEffect, useState } from 'react';
import { getSingleBook } from '@/api/bookData';
import PropTypes from 'prop-types';
import VaEditForm from '../../../../components/forms/VAEditForms';

export default function VaEditBook({ params }) {
  const [editItem, setEditItem] = useState(null);
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleBook(firebaseKey).then((book) => {
      if (!book.firebaseKey) book.firebaseKey = firebaseKey;
      setEditItem(book);
    });
  }, [firebaseKey]);

  if (!editItem) return <div className="text-white text-center">Loading...</div>;

  return <VaEditForm obj={editItem} />;
}

VaEditBook.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
