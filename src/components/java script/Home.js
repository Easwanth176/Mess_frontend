import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../css/Home.css';

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [userData, setUserData] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Use useLocation to get the mealType and registrationNumber from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mealType = searchParams.get('mealType');
  const registrationNumber = location.pathname.split('/').pop();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
      setCurrentTime(now.toLocaleTimeString('en-US', timeOptions));
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);

    // Fetch user information from an API endpoint
    axios.get(`https://mess-backend-3lo9.onrender.com/user-data/${registrationNumber}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    return () => clearInterval(intervalId);
  }, [registrationNumber]);

  // Function to toggle between dark mode and light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`base ${darkMode ? 'dark' : 'light'}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'X' : 'X'}
      </button>
      <div>
        <div className="hname">
          <h7>Mess Pass</h7>
        </div>
        <div className="meal-approved">
          <div className="header">
            <div className="image-circle">
              {userData ? (
                <img src={`data:image/jpeg;base64,${userData.image}`} alt=''/>
              ) : (
                <p>Loading image...</p>
              )}
            </div>
            <div className="info">
              <h2>{mealType}</h2>
              {userData ? (
                <p>{userData.registrationNumber}</p>
              ) : (
                <p>Loading registration number...</p>
              )}
              {userData ? (
                <p>{userData.name}</p>
              ) : (
                <p>Loading name...</p>
              )}
              {userData ? (
                <p>{userData.hostel}</p>
              ) : (
                <p>Loading hostel...</p>
              )}
            </div>
          </div>
          <h3>Meal Approved</h3>
          <div className="sqaure">

                <div className="approved-icon">
        <div className="circle-border">
          <div className="green-circle">
            <div className="tick"></div>
          </div>
        </div>
      </div>



          </div>
          <div className="body">
            <div className="info">
              <p>Date: <div> {currentDate}</div></p>
              <div className="hr-line"></div>
              <p>Time: <div>{currentTime}</div> </p>
              <p className="verification-code">Verification Code: <div></div>81241</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
