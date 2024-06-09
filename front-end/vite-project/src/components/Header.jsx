
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/argentBankLogo.webp';
import { logout } from '../redux/actions/auth.actions';
import { updateUsername } from '../redux/actions/user.actions'; // Import the action to update the username
import '../sass/components/_Header.scss';

function Header() {
    const isConnected = useSelector((state) => state.auth.token);
    const firstname = useSelector((state) => state.user.userData.firstname);
    const username = useSelector((state) => state.user.userData.username);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [showFirstname, setShowFirstname] = useState(true); // State to control the display of firstname

    useEffect(() => {
        if (!firstname) {
            setShowFirstname(false);
        }
    }, [firstname]);

    const logoutHandler = () => {
        dispatch(logout());
        sessionStorage.clear();
        localStorage.clear();
        navigate('/');
    };

    const handleonsubmit = () => {
        // Simulate updating the username in store
        dispatch(updateUsername('New Username'));
        setShowFirstname(false); // Hide the firstname when the username is updated
    };

    return (
        <header>
            <nav>
                <Link to="/">
                    <img src={Logo} alt="Bank Logo" />
                </Link>
                {isConnected ? (
                    <div className="connected">
                        <Link to="/profile">
                            <i className="fa-solid fa-2x fa-circle-user" />
                            {showFirstname && <p>{firstname}</p>}
                            <p>{username}</p>
                        </Link>
                        <Link to="/" onClick={logoutHandler}>
                            <i className="fa-solid fa-arrow-right-from-bracket" />
                            <p> Sign out </p>
                        </Link>
                    </div>
                ) : (
                    <div className="not-connected">
                        <Link to="/login">
                            <i className="fa-regular fa-circle-user"></i>
                            <i className="fa-solid fa-2x fa-circle-user" />
                            <p>Sign In</p>
                            <i className="fa-solid fa-2x fa-circle-user" />
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;


