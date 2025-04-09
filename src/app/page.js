'use client';

import { useEffect, useState } from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getBooks } from '@/api/bookData';
import { useRouter } from 'next/navigation';
import { TbDeviceDesktopCheck, TbDeviceMobileCheck } from 'react-icons/tb';
import { IoIosInformationCircleOutline } from 'react-icons/io';

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
        book.title?.toLowerCase().includes(lowerSearch)
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  return (
    <div
      className="text-center d-flex flex-column align-items-center"
      style={{ minHeight: '100vh', padding: '40px' }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: '95%',
          backgroundColor: '#D9D9D9',
          borderRadius: '30px',
          padding: '40px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >

        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form.Control
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '300px',
              borderRadius: '30px',
              padding: '10px 15px',
            }}
          />
          <div className="text-black fw-bold fs-5">Total: {filteredBooks.length}</div>
        </div>

        {loading ? (
          <Spinner animation="border" variant="dark" />
        ) : filteredBooks.length === 0 ? (
          <p className="text-black">No books found.</p>
        ) : (
          <div style={{ maxHeight: '800px', overflowY: 'auto' }}>
            <ul className="list-group">
              {filteredBooks.map((book) => (
                <li
                  key={book.firebaseKey}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{book.title}</strong>
                    {book.date && (
                      <small className="text-muted ms-2">({book.date})</small>
                    )}
                  </div>

                  <div className="d-flex align-items-center ms-auto gap-2">
                    {book.posted_to_facebook && (
                      <TbDeviceMobileCheck color="#007bff" size={20} />
                    )}
                    {book.posted_to_website && (
                      <TbDeviceDesktopCheck color="#28a745" size={20} />
                    )}
                    <Button
                    variant="light"
                    size="sm"
                    onClick={() => router.push(`/book/${book.firebaseKey}`)}
                    style={{
                      borderRadius: '50px',
                      backgroundColor: '#D9D9D9',
                      color: 'black',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '80px',           // Wider for pill shape
                      height: '36px',
                      border: 'none',
                      padding: '0 12px',
                      fontWeight: '500',
                    }}
                  >
                    <IoIosInformationCircleOutline size={22} />
                  </Button>
                  </div>

                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
