'use client';

import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, Container, Row, Col } from 'react-bootstrap';
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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div
        style={{
          backgroundColor: '#D9D9D9',
          borderRadius: '30px',
          padding: '50px',
          width: '95%',
          maxWidth: '900px',
        }}
      >
        <h2 className="text-black mb-4 text-center">VA Edit Book</h2>
        <Form onSubmit={handleSubmit}>
          <Row xs={1} md={2} className="g-4">
            <Col>
              <FloatingLabel controlId="amazonLink" label="Amazon Link">
                <Form.Control
                  type="text"
                  name="amazonLink"
                  value={formInput.amazonLink}
                  onChange={handleChange}
                  placeholder="Enter Amazon link"
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="image" label="Image URL">
                <Form.Control
                  type="text"
                  name="image"
                  value={formInput.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="posted_to_facebook" label="Posted to Facebook">
                <Form.Control
                  type="date"
                  name="posted_to_facebook"
                  value={formInput.posted_to_facebook}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="posted_to_website" label="Posted to Website">
                <Form.Control
                  type="date"
                  name="posted_to_website"
                  value={formInput.posted_to_website}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button type="submit" variant="dark" size="lg" style={{ borderRadius: '30px', padding: '10px 40px' }}>
              Update Book Info
            </Button>
          </div>
        </Form>
      </div>
    </Container>
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
