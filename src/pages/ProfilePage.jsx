import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function ProfilePage(props) {
    const { accessToken, setIsLogged, setAccessToken, notify } = props;

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    // const userData = {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'email@example.com',
    //     username: "johndoe654",

    // }
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const result = await axios("http://localhost:3030/users/profile", {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    method: "POST",
                });
                setUserData(result.data.data);
            } catch (error) {
                setIsLogged(false);
                setAccessToken("");
                sessionStorage.removeItem("accessToken");
                notify(`Votre session a expirée, veuillez vous reconnecter.`, "error");
                navigate('/signin');
            }
        }

        fetchUserProfile();
    }, [])

    return (
        <Container>
            <h1>Bienvenue {userData.firstName} {userData.lastName}</h1>
            <ul>
                <li>Email : {userData.email}</li>
                <li>Username : {userData.username}</li>
            </ul>
        </Container>
    )
}
