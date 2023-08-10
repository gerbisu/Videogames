import "./landing.style.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <p>API VIDEOGAMES</p>

      <Link to={`/home`}>
        <button className="landing-button">Ingresar</button>
      </Link>
    </div>
  );
}

export default Landing;
