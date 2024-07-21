import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='books-container'>
      {books.map((item, index) => (
        <div key={index}>
          <div className="card">
            <h2 className='book-index'>{index + 1}</h2>
            <div className="card-details">
              <p className="text-title">{item.title}</p>
              <p className="text-body">Publish Year : {item.publishYear}</p>
            </div>
            <button className="card-button"><Link className='home-link' to={`/books/details/:${item._id}`}> Details </Link></button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Home;
