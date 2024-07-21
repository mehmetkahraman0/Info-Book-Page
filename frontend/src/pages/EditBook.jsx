import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
      }).catch((error) => {
        console.log(error);
      });

  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="modal">
      <div className="modal__header">
          <span className="modal__title">Edit Book Page</span>
        </div>
        <div className="modal__body">
          <div className="input">
            <label className="input__label">Book Name</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input__field" type="text" placeholder='Enter Book Name' />
          </div>
          <div className="input">
            <label className="input__label">Publish Year</label>
            <input value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className="input__field" type="text" placeholder='Enter Book Publish Year' />
          </div>
          <div className="input">
            <label className="input__label">Author</label>
            <textarea value={author} onChange={(e) => setAuthor(e.target.value)} className="input__field input__field--textarea" placeholder='Enter Book Author'></textarea>
          </div>
        </div>
        <div className="modal__footer">
          <button style={{ letterSpacing: "1.5px", fontWeight: "800", marginLeft: "-9px" }} className='button is-ghost' onClick={handleEditBook}>
            Edit Book
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditBook