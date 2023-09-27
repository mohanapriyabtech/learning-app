import React from 'react';
import "../../css/Sidebar.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const Sidebar = ({ isOpen }) => {
  return (
    <>
    <div className="sidebar">
        {/* <img src={logo} alt="Image description" class="custom-image" /> */}
        {/* <p className="sidebar-name">Learn</p> */}
        <div className='circle-icon custom-icon-size'>
          <div className='icon-container'>
            <AccountCircleIcon style={{ fontSize: 75 }} />
          </div>
          <p className='username'>username</p>
        </div>
        <ul>
          <li><a href="/dashboard/projects">Project</a></li>
          <li><a href="/dashboard/settings">Settings</a></li>
          <li><a href="/dashboard/help">Help</a></li>
        </ul>
    </div>
    </>
  );
};

export default Sidebar;
