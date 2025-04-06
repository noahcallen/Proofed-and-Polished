'use client';

import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { updateBook } from '@/api/bookData';
import PropTypes from 'prop-types';

const initialState = {
  amazonLink: '',
  image: '',
  posted_to_facebook: '',
  posted_to_website: ''
};

export default function VaEditForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj && Object.keys(obj).length > 0) {
      setFormInput({
        amazonLink: obj.amazonLink || '',
        image: obj.image || '',
        posted_to_facebook: obj.posted_to_facebook || '',
        posted_to_website: obj.posted_to_website || ''
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook(obj.firebaseKey, formInput).then(() => {
      window.location.href = `/book/${obj.firebaseKey}`;
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">VA Edit Book</h2>

      <FloatingLabel controlId="amazonLink" label="Amazon Link" className="mb-3">
        <Form.Control
          type="text" // ✅ No URL type = no HTML5 required validation
          name="amazonLink"
          value={formInput.amazonLink}
          onChange={handleChange}
          placeholder="Enter Amazon link"
        />
      </FloatingLabel>

      <FloatingLabel controlId="image" label="Image URL" className="mb-3">
        <Form.Control
          type="text" // ✅ Same here
          name="image"
          value={formInput.image}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      </FloatingLabel>

      <FloatingLabel controlId="posted_to_facebook" label="Posted to Facebook (YYYY-MM-DD)" className="mb-3">
        <Form.Control
          type="date"
          name="posted_to_facebook"
          value={formInput.posted_to_facebook}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="posted_to_website" label="Posted to Website (YYYY-MM-DD)" className="mb-3">
        <Form.Control
          type="date"
          name="posted_to_website"
          value={formInput.posted_to_website}
          onChange={handleChange}
        />
      </FloatingLabel>

      <Button variant="success" type="submit">
        Update Book Info
      </Button>
    </Form>
  );
}

VaEditForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    amazonLink: PropTypes.string,
    image: PropTypes.string,
    posted_to_facebook: PropTypes.string,
    posted_to_website: PropTypes.string,
  }).isRequired,
};
