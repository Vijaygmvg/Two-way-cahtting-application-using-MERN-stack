import React, { useState } from 'react';
import '../CSS/SideDrawer.css'; // Import the CSS file

export default function SideDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the state to show or hide the side drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to open/close the side drawer */}
      <button onClick={toggleDrawer} className="toggle-btn">
        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>

      {/* Side drawer */}
      <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleDrawer}>X</button>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </div>

      {/* Main content */}
      <div className={`main-content ${isOpen ? 'shifted' : ''}`}>
        <h1>Main Content</h1>
        <p>Click the button to open or close the sidebar.</p>
      </div>
    </div>
  );
}
