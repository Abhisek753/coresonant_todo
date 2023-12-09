import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faTools, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Logo from "../../assets/Images/logo.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ textAlign: "left" }}>
      <Nav vertical>
        <div style={{ margin: "24px 30px" }}>
          <img src={Logo} alt="Logo" style={{width:"50%"}} />
        </div>
        <div style={{ marginTop: "30px" }}>
          <NavItem className='ancor-tag sidebar-list'>
            <FontAwesomeIcon  icon={faTachometerAlt} /> 
            <Link to="/dashboard">Dashboard</Link>
          </NavItem>
          <NavItem className='ancor-tag sidebar-list'>
            <FontAwesomeIcon  icon={faUsers} />
            <Link to="/tasklist">Task List</Link>
          </NavItem>
          <NavItem className='ancor-tag sidebar-list'>
            <FontAwesomeIcon icon={faTools} />
            <Link>Services</Link>
          </NavItem>
       
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
