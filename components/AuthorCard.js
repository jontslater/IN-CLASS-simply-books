import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React from 'react';
import Link from 'next/link';
import { deleteAuthorBooks } from '../api/mergedData';

function AuthorCard({ authorObj, onUpdate }) {
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name} ${authorObj.last_name}?`)) {
      deleteAuthorBooks(authorObj.firebaseKey).then(() => onUpdate());
    }
  };
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{authorObj.email}</Card.Title>
        <Card.Title>{authorObj.first_name}</Card.Title>
        <Card.Title>{authorObj.last_name}</Card.Title>
        <p className="card-text bold">{authorObj.favorite && <span>FAVORITE<br /></span> }</p>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Link href={`/author/${authorObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
          DELETE
        </Button>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
