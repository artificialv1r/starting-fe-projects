import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import '../../core/global.scss';
import './layout.scss';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home-container">
      <h1>Dobrodošli!</h1>
      
      {user ? (
        <div>
          <p className="welcome-text">
            Zdravo, <strong>{user.sub}</strong>! 
            Uspešno si prijavljen/a.
          </p>
        </div>
      ) : (
        <div>
          <p className="welcome-text">
            Prijavi se da pristupiš funkcionalnostima.
          </p>
        </div>
      )}
      
      <div className="features-box">
        <h2>Postojeće funkcionalnosti:</h2>
        <ul>
          <li>Registracija novih korisnika, prijava i odjava</li>
          <li>Čitanje username i role u Header komponenti</li>
          <li>Pregled registrovanih korisnika u ulozi User</li>
          <li>Pregled projekata odabranog korisnika</li>
        </ul>
        <b>Prijavi se sa "alice" i "Alice123!" da vidiš sve funkcije</b>
      </div>
    </div>
  );
};

export default Home;
