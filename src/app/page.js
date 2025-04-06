'use client';

import { useEffect, useState } from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';
import { signOut } from '@/utils/auth';
import { useAuth } from '@/utils/context/authContext';
import { getBooks } from '@/api/bookData';
import { useRouter } from 'next/navigation';

function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getBooks().then((bookList) => {
      setBooks(bookList);
      setFilteredBooks(bookList);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = books.filter((book) =>
        book.title?.toLowerCase().includes(lowerSearch) ||
        book.description?.toLowerCase().includes(lowerSearch)
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  return (
    <div
      className="text-center d-flex flex-column align-items-center"
      style={{ minHeight: '90vh', padding: '30px' }}
    >
      <div className="w-100" style={{ maxWidth: '800px' }}>
        <h2 className="text-white text-start mb-3">All Books</h2>

        <Form.Control
          type="text"
          placeholder="Search books..."
          className="mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <Spinner animation="border" variant="light" />
        ) : filteredBooks.length === 0 ? (
          <p className="text-white">No books found.</p>
        ) : (
          <ul className="list-group">
            {filteredBooks.map((book) => (
              <li
                key={book.firebaseKey}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{book.title}</strong> — {book.description}
                  {book.date && (
                    <small className="text-muted ms-2">({book.date})</small>
                  )}
                </div>

                <div className="d-flex align-items-center ms-auto gap-2">
                  {book.posted_to_facebook && <span>📱</span>}
                  {book.posted_to_website && <span>💻</span>}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => router.push(`/book/${book.firebaseKey}`)}
                  >
                    View
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
