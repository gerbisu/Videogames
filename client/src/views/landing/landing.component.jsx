import "./landing.style.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <p className="landing-text">V I D E O G A M E S</p>

      <Link className="landing-button-Link" to={`/home`}>
        <button className="landing-button">Ingresar</button>
      </Link>
    </div>
  );
}

export default Landing;
