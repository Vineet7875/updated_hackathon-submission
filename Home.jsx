import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";
function Home() {
  const navigate = useNavigate();
  const handleClick = (card) => {
    navigate('/SubForm', { state: { card } });
  };
  return (
    <div className="home-container">
      <div className="left-container">
        <h1>Hackathon Submissions</h1>
        <p>Welcome to our hackathon submission platform. Submit your project and get a chance to win exciting prizes!</p>
        <button className="submit-button" onClick={() => { handleClick() }}>Upload Submission</button>
      </div>
      <div className="right-container">
        {/* <div className="waves">

        </div> */}
        <img id="bulb" src="Handholdingbulb3D.png" alt="Handholdingbulb" />
      </div>
    </div>
  );
}

export default Home;
