/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getDatabase, ref, get } from "firebase/database";

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
          } else {
            console.warn("No role found for user:", user.uid);
          }
        })
        .catch((error) => console.error("Error fetching user role:", error));
    }
  }, [user]);

  console.log("User Role:", userRole); // 🔥 Debugging: Check if role is being set

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          Book Tracker
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" href="/">Home</Link>

            {/* Debug: Show user role */}
            <span className="text-white mx-3">Role: {userRole}</span>

            {/* Only show "Create Book" link for Admins */}
            {userRole === "admin" && (
              <Link className="nav-link" href="/book/new">Create Book</Link>
            )}
          </Nav>

          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
