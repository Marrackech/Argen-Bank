
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../../src/redux/actions/user.actions.jsx';

const User = () => {
    const [userName, setUserName] = useState('');
    const [display, setDisplay] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();

    const isValidName = (name) => {
        return name.length >= 3;
    }

    const handleSubmitUsername = async (event) => {
        event.preventDefault();
        console.log("Submitting username form...", userName);
        if (!isValidName(userName)) {
            setErrorMessage("Invalid username");
            return;
        } else {
            setErrorMessage("");
        }

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userName: userName }),
            });
            if (response.ok) {
                console.log("API call successful");
                const data = await response.json();
                console.log("API response data:", data);
                const username = data.body.userName;
                dispatch(updateUsername(username));
                setDisplay(!display);
            } else {
                console.log("Invalid Fields");
            }
        } catch (error) {
            console.error("API error:", error);
        }
    }

    return (
        <div className='white'>
            <h1>welcome</h1>
            <form onSubmit={handleSubmitUsername}>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter new username"
                />
                <button type="submit">Update Username</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <div>
               
                
                  <h1>{userData.username}</h1>
                <h1>{userData.lastname}</h1>

              
            

            </div>
        </div>
    );
}

export default User;

