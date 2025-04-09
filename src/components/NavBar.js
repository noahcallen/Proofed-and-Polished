/* eslint-disable jsx-a11y/anchor-is-valid */
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar, Container } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getDatabase, ref, get } from 'firebase/database';
import { RiBookFill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { IoPersonCircleOutline } from 'react-icons/io5';

export default function NavBar() {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (user && user.uid) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserRole(snapshot.val().role);
          }
        })
        .catch((error) => console.error('Error fetching user role:', error));
    }
  }, [user]);

  return (
    <Navbar className="custom-navbar py-3 mt-4">
      <Container fluid className="d-flex align-items-center justify-content-between px-4">
        {/* Centered logo */}
        <div className="position-absolute top-50 start-50 translate-middle">
          <img
            src="/images/defaultImage.png"
            alt="Logo"
            style={{ height: '200px' }}
          />
        </div>

        {/* Placeholder for left side spacing */}
        <div style={{ width: '80px' }} />

        {/* Right-aligned icon group */}
        <div className="icon-pill d-flex align-items-center gap-3 px-4 py-2">
          <Link href="/">
            <RiBookFill className="nav-icon" />
          </Link>

          {userRole === 'admin' && (
            <Link href="/book/new">
              <IoMdAdd className="nav-icon" />
            </Link>
          )}

          <div onClick={signOut}>
            <IoPersonCircleOutline className="nav-icon" />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
