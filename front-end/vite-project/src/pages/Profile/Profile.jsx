
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from '../../components/User.jsx';
import Account from '../../components/Account.jsx';
import AccountCardData from '../../data/AccountCardData.json';
import { userProfile } from '../../redux/actions/user.actions.jsx';

function UserProfile () {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            const fetchUserData = async () => {
                try {
                    console.log("Fetching user data...");
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log("User data fetched successfully:", data);
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName
                        };
                        dispatch(userProfile(userData));
                    } else {
                        console.log("Error while retrieving profile");
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            };
            fetchUserData();
        }
    }, [dispatch, token]);

    return (
        <div className='profile-page'>
            <main className='bg-dark'>
                <User />
                {AccountCardData.map((data) => (
                    <Account 
                        key={data.id}
                        title={data.title}
                        amount={data.amount}
                        description={data.description}
                    />
                ))}
            </main>
        </div>
    );
}

export default UserProfile;


