import { useState } from 'react'
import './App.css'

function App() {
  const [film, setFilm] = useState('');
  const [state, setState] = useState([]);

  const handleAddFilm = () => {
    if (film.trim() === '') return;

    const newFilms = {
      id: Date.now(),
      name: film,
      rate: 0,
      isClicked: false
    };

    setState([...state, newFilms]);
    setFilm('');
  };

  const handleMinusRate = (idItem) => {
    setState(state.map(item => {
      if (item.id === idItem && item.rate > 0) {
        return {...item, rate: item.rate - 1};
      }
      return item;
    }));
  };
  const handlePlusRate = (idItem) => {
    setState(state.map(item => {
      if (item.id === idItem && item.rate < 5) {
        return {...item, rate: item.rate + 1};
      }
      return item;
    }));
  };

  const handleDelete = (idToDelete) => {
    setState(state.filter(item => item.id !== idToDelete));
  };

  const handleToLike = (idToLike) => {
    setState(state.map(item => {
      if (item.id === idToLike) {
        return {...item, isClicked: !item.isClicked}
      }
      return item;
  }))};

  const handleToClear = () => {
    setState([]);
  };
 
  return (
    <div className="card">
      <h1>Enter your favourite films:</h1>
      <div className="input-field">
        <input type="text"
        placeholder='Enter your film...' 
        className='input' 
        value={film}
        onChange={(e) => setFilm(e.target.value)} />
        <button type="button"
        className='btn-main'
        onClick={handleAddFilm}>
          Enter
        </button>
        <button type="button" className='btn-main clear' onClick={handleToClear}>Clear</button>
      </div>

      <div className="films-list">
        {state.map(item =>
          <div className="movie" key={item.id}>
            <div className="film-field">
            <h3>{item.name}</h3>
            <button type="button" className='btn-delete' onClick={() => handleDelete(item.id)}>x</button>
            </div>
            <p className={item.isClicked ? "like like-active" : "like"} onClick={() => handleToLike(item.id)}>★</p>
            <div className="rating">
              <button className="sign" onClick={() => handleMinusRate(item.id)}>–</button>
              <p>{item.rate}</p>
              <button className="sign" onClick={() => handlePlusRate(item.id)}>+</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
