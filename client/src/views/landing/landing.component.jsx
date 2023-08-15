import "./landing.style.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="Landing">
      <p className="landing-text">API VIDEOGAMES</p>

      <Link className="landing-button-Link" to={`/home`}>
        <button className="landing-button">Ingresar</button>
      </Link>
    </div>
  );
}

export default Landing;
