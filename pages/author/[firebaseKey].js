import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
import { getAuthorBooks } from '../../api/authorData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const [books, setBooks] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getAuthorBooks(firebaseKey).then(setBooks);
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-white ms-5 details">
        <h5>
          by {authorDetails.first_name} {authorDetails.last_name}
          {authorDetails.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
        {books.map((book) => (
          <BookCard key={book.AuthorBooksArray} bookObj={book} />
        ))}
      </div>
    </div>
  );
}
