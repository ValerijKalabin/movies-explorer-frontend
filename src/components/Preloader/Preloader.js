import React from 'react'
import './Preloader.css'

const Preloader = ({ isVisiblePreloader }) => {
  return (
    <div className={`preloader ${isVisiblePreloader ? 'preloader_visible' : ''}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
