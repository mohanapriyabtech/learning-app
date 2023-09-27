import React from 'react';
import DehazeIcon from '@material-ui/icons/Dehaze';




const Button = ({ onClick }) => {
  return (
    <button className="sidebar-toggle-button" onClick={onClick}>
        <DehazeIcon />
    </button>
  );
};

export default Button;
