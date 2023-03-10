import React from 'react';

import closeIcon from '../../icons/closeicon.png';
import onlineIcon from '../../icons/onlineicon.png';

import './InfoBar.css'

function InfoBar({room}) {
  return (
    <div className='infoBar'>
        <div className="leftInnerContainer">
            <img className='onlineIcon' src={onlineIcon} alt="online image" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image" /></a>
        </div>
    </div>
  )
}

export default InfoBar