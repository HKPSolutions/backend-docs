import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './HomePage.scss';

function HomePage() {
    return (
        <div className="HomePage">
            <div className="card">
                <img src={logo} alt="logo" className="logo"></img>
                <p>Welcome to the official HKP Solutions Backend Documentation!</p>
                <p>
                    The backend team writes the business logic of the application which you can access through our APIs.
                    All APIs are thoroughly documented using the OpenAPI 3.0.3 standard.
                </p>

                <h3>Check it out:</h3>
                <ul>
                    <Link to="/beta-api-docs">HKP Solutions Beta App API</Link>
                    <Link className="disabled" aria-disabled>Coming Soon: HKP Solutions PMS App API</Link>
                </ul>
            </div>
        </div>
    );
}

export default HomePage;
