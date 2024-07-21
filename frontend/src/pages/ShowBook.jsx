import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const id1 = id.slice(1)
  console.log(id1)

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id1}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5555/books/${id1}`)
      .then(() => {
        alert("You will be directed to the books page where the deletion process is successful.")
        window.location ="/"
      })
      .catch(err => {
        console.log(err);
      })
  }
const goEditBook = () => {
  window.location = `http://localhost:5173/books/edit/${id1}`
}

  const capitalizeFirstChar = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className='p-4'>
      {loading
        ?
        (
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )
        :
        (
          <div className="modal">
            <article className="modal-container">
              <header className="modal-container-header">
                <span className="modal-container-title">
                  <div className="title-div">{capitalizeFirstChar(book.title)}</div>
                </span>

              </header>
              <section className="modal-container-body">
                <div className="author-div">{book.publishYear}</div>
                <br />
                <br />
                {book.author}
              </section>
              <footer className="modal-container-footer">
                <button onClick={()=> goEditBook()} className="button is-ghost"> Edit </button>
                <button onClick={() => handleDelete()} className="button is-ghost">Delete </button>
              </footer>
            </article>
          </div>
        )}
    </div>
  );
};

export default ShowBook;
