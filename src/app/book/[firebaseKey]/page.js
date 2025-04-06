'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Spinner, Button } from 'react-bootstrap';
import { getDatabase, ref, get, remove, update } from 'firebase/database';
import { useAuth } from '@/utils/context/authContext';

export default function BookDetails() {
  const { firebaseKey } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const db = getDatabase();

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid && firebaseKey) {
        try {
          const userSnap = await get(ref(db, `users/${user.uid}`));
          if (userSnap.exists()) {
            const userData = userSnap.val();
            console.log('🔍 VA Role fetched:', userData.role);
            setRole(userData.role);
          } else {
            console.warn('⚠️ No user role found, defaulting to "va"');
            setRole('va');
          }

          const bookSnap = await get(ref(db, `books/${firebaseKey}`));
          if (bookSnap.exists()) {
            setBook(bookSnap.val());
          } else {
            console.error('📕 No book found for key:', firebaseKey);
          }
        } catch (error) {
          console.error('❌ Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user, firebaseKey]);

  const handleDelete = () => {
    remove(ref(db, `books/${firebaseKey}`)).then(() => {
      router.push('/');
    });
  };

  const handlePost = (platform) => {
    const today = new Date().toISOString().split('T')[0];
    const updatePath = platform === 'facebook' ? 'posted_to_facebook' : 'posted_to_website';

    update(ref(db, `books/${firebaseKey}`), {
      [updatePath]: today,
    }).then(() => {
      setBook((prev) => ({ ...prev, [updatePath]: today }));
    });
  };

  if (loading || !book) return <Spinner animation="border" className="text-center m-5" />;

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="text-white bg-dark" style={{ width: '40rem' }}>
        <Card.Img
          variant="top"
          src={book.image || '/images/defaultImage.png'}
          alt={book.title}
          style={{ objectFit: 'cover', height: '300px' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/defaultImage.png';
          }}
        />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.description}</Card.Text>
          <hr />
          <p><strong>Date:</strong> {book.date}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Sub Genre:</strong> {book.sub_genre}</p>
          <p><strong>Pen Name:</strong> {book.pen_name}</p>
          {book.amazonLink && (
            <p><strong>Amazon:</strong> <a href={book.amazonLink} target="_blank" rel="noreferrer">{book.amazonLink}</a></p>
          )}

          {role === 'admin' && (
            <>
              <p><strong>Word Count:</strong> {book.word_count}</p>
              <p><strong>Hours Worked:</strong> {book.hours}</p>
              <p><strong>Hourly Rate:</strong> ${book.hourly_rate}</p>
              <p><strong>Invoiced Amount:</strong> ${book.invoiced_amount}</p>
              <p><strong>Words Per Hour (WPH):</strong> {book.wph}</p>
              <p><strong>Service:</strong> {book.status}</p>
            </>
          )}

          {(role === 'admin' || role === 'va') && (
            <div className="d-flex gap-2 flex-wrap mt-3">
              <Button
                variant="info"
                size="sm"
                onClick={() => handlePost('facebook')}
                disabled={!!book.posted_to_facebook}
              >
                {book.posted_to_facebook ? `Posted to FB: ${book.posted_to_facebook}` : 'Post to FB'}
              </Button>

              <Button
                variant="info"
                size="sm"
                onClick={() => handlePost('website')}
                disabled={!!book.posted_to_website}
              >
                {book.posted_to_website ? `Posted to Web: ${book.posted_to_website}` : 'Post to Website'}
              </Button>
            </div>
          )}

          {role === 'admin' && (
            <div className="d-flex gap-2 mt-3">
              <Button variant="primary" onClick={() => router.push(`/book/edit/${firebaseKey}`)}>
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}

          {role === 'va' && (
            <div className="d-flex gap-2 mt-3">
              <Button variant="secondary" onClick={() => router.push(`/book/vaEdit/${firebaseKey}`)}>
                VA Edit
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
