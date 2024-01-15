import React, { useEffect, useState } from 'react';
import { getAuthors } from '../api/authorData';
import { useAuth } from '../utils/context/authContext';
import AuthorCard from '../components/AuthorCard';

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const { user } = useAuth();
  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };
  useEffect(() => {
    getAllAuthors();
  });
  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
        ))}
      </div>

    </div>
  );
}
