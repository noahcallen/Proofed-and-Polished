'use client';

import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '100vh',
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      <img
        src="/images/defaultImage.png"
        alt="Logo"
        style={{
          height: '280px',
          marginBottom: '20px',
        }}
      />

      <Button
        type="button"
        size="lg"
        onClick={signIn}
        className="rounded-pill"
        style={{
          backgroundColor: '#000',
          border: 'none',
          fontSize: '1.5rem',
          padding: '14px 40px',
        }}
      >
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
