import React from 'react';
import { Link } from 'react-router-dom';
import  mind  from '../../assets/images/mind.png'

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <section className="header-content">
      <Link
          to={`/`}
          className="header-title animate-pop-in"
        >
      <img className="mind animate-pop-in" src={mind} alt="mind"></img>
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        
          <h1 className="header-title animate-pop-in"></h1>
        
      </div>
      </Link>{' '}
      </section>
    </header>
  );
};

export default Header;
