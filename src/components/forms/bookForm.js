'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createBook, updateBook } from '@/api/bookData';
import { getDatabase, ref, get } from 'firebase/database';
import PropTypes from 'prop-types';

const initialState = {
  title: '',
  author: '',
  genre: '',
  sub_genre: '',
  pen_name: '',
  date: '',
  amazonLink: '',
  image: '',
  word_count: '',
  hours: '',
  hourly_rate: '',
  invoiced_amount: '',
  wph: '',
  status: '',
  posted_to_facebook: '',
  posted_to_website: ''
};

function BookForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(initialState);
  const [userRole, setUserRole] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  const db = getDatabase();

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) setUserRole(snapshot.val().role);
      });
    }
  }, [user]);

  useEffect(() => {
    if (obj && Object.keys(obj).length > 0) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedInput = { ...formInput, [name]: value };

    const wordCount = Number(updatedInput.word_count);
    const hoursWorked = Number(updatedInput.hours);
    const invoicedAmount = Number(updatedInput.invoiced_amount);

    if (hoursWorked > 0) {
      if (wordCount > 0) {
        updatedInput.wph = (wordCount / hoursWorked).toFixed(2);
      }

      if (invoicedAmount > 0) {
        updatedInput.hourly_rate = (invoicedAmount / hoursWorked).toFixed(2);
      }
    }

    setFormInput(updatedInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userRole !== 'admin') return;

    const payload = {
      ...formInput,
      uid: user.uid,
      image: formInput.image || '/images/defaultImage.png',
    };

    if (formInput.firebaseKey) {
      updateBook(formInput.firebaseKey, payload).then(() => {
        router.push(`/book/${formInput.firebaseKey}`);
      });
    } else {
      createBook(payload).then(({ firebaseKey }) => {
        updateBook(firebaseKey, { firebaseKey }).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{formInput.firebaseKey ? 'Update' : 'Create'} Book</h2>

      <FloatingLabel controlId="title" label="Book Title" className="mb-3">
        <Form.Control type="text" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="author" label="Author" className="mb-3">
        <Form.Control type="text" name="author" value={formInput.author} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="genre" label="Genre" className="mb-3">
        <Form.Control type="text" name="genre" value={formInput.genre} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="sub_genre" label="Sub Genre" className="mb-3">
        <Form.Control type="text" name="sub_genre" value={formInput.sub_genre} onChange={handleChange} />
      </FloatingLabel>

      <FloatingLabel controlId="pen_name" label="Pen Name" className="mb-3">
        <Form.Control type="text" name="pen_name" value={formInput.pen_name} onChange={handleChange} />
      </FloatingLabel>

      <FloatingLabel controlId="date" label="Date" className="mb-3">
        <Form.Control type="date" name="date" value={formInput.date} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="amazonLink" label="Amazon Link" className="mb-3">
        <Form.Control type="url" name="amazonLink" value={formInput.amazonLink} onChange={handleChange} />
      </FloatingLabel>

      <FloatingLabel controlId="image" label="Image URL" className="mb-3">
        <Form.Control type="text" name="image" value={formInput.image} onChange={handleChange} />
      </FloatingLabel>

      {userRole === 'admin' && (
        <>
          <FloatingLabel controlId="word_count" label="Word Count" className="mb-3">
            <Form.Control type="number" name="word_count" value={formInput.word_count} onChange={handleChange} />
          </FloatingLabel>

          <FloatingLabel controlId="hours" label="Hours Worked" className="mb-3">
            <Form.Control type="number" name="hours" value={formInput.hours} onChange={handleChange} />
          </FloatingLabel>

          <FloatingLabel controlId="hourly_rate" label="Hourly Rate ($)" className="mb-3">
            <Form.Control type="number" name="hourly_rate" value={formInput.hourly_rate} onChange={handleChange} />
          </FloatingLabel>

          <FloatingLabel controlId="invoiced_amount" label="Invoiced Amount ($)" className="mb-3">
            <Form.Control type="number" name="invoiced_amount" value={formInput.invoiced_amount} onChange={handleChange} />
          </FloatingLabel>

          <FloatingLabel controlId="wph" label="Words Per Hour (Auto)" className="mb-3">
            <Form.Control type="text" name="wph" value={formInput.wph} readOnly />
          </FloatingLabel>

          <FloatingLabel controlId="status" label="Service" className="mb-3">
            <Form.Select name="status" value={formInput.status} onChange={handleChange}>
              <option value="">Select Service</option>
              <option value="Proofed">Proofed</option>
              <option value="Copyedit">Copyedit</option>
              <option value="Line Edit">Line Edit</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId="posted_to_facebook" label="Posted to Facebook" className="mb-3">
            <Form.Control type="date" name="posted_to_facebook" value={formInput.posted_to_facebook || ''} onChange={handleChange} />
          </FloatingLabel>

          <FloatingLabel controlId="posted_to_website" label="Posted to Website" className="mb-3">
            <Form.Control type="date" name="posted_to_website" value={formInput.posted_to_website || ''} onChange={handleChange} />
          </FloatingLabel>
        </>
      )}

      {userRole === 'admin' && <Button type="submit">{formInput.firebaseKey ? 'Update' : 'Create'} Book</Button>}
    </Form>
  );
}

BookForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    genre: PropTypes.string,
    sub_genre: PropTypes.string,
    pen_name: PropTypes.string,
    date: PropTypes.string,
    amazonLink: PropTypes.string,
    image: PropTypes.string,
    word_count: PropTypes.string,
    hours: PropTypes.string,
    hourly_rate: PropTypes.string,
    invoiced_amount: PropTypes.string,
    wph: PropTypes.string,
    status: PropTypes.string,
    posted_to_facebook: PropTypes.string,
    posted_to_website: PropTypes.string
  }),
};

export default BookForm;
