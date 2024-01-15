import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
import { getAuthorBooks } from '../../api/authorData';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getAuthorBooks(firebaseKey).then(setAuthorDetails);
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.author_id} by {authorDetails.authorObject?.first_name} {authorDetails.authorObject?.last_name}
          {authorDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.authorObject?.email}`}>{authorDetails.authorObject?.email}</a>
        <hr />
      </div>
    </div>
  );
}
