import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function SigninPage(props) {
    const { setIsLogged, notify, setAccessToken } = props;

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            identifier: identifier,
            password: password,
        }

        if (Object.values(userData).includes("")) {
            notify("Veuillez remplir tous les champs", "warning");
            return;
        }

        // Envoi des données au serveur
        axios("http://localhost:3030/users/signin", {
            method: "POST",
            data: userData,
        }).then((res) => {
            console.log(res);

            setIsLogged(true);
            
            sessionStorage.setItem("accessToken", res.data.token);
            setAccessToken(res.data.token);
            notify("Connexion réussie", "success");
            navigate("/profile");
        }).catch((err) => {
            notify(`Une erreur est survenue ${err?.response?.data?.message || ""}`, "error");
        });

    }

    return (
        <Container className='mt-4'>
            <h1>Connexion</h1>
            <Form onSubmit={(e) => handleSubmit(e)} className='mt-4'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email/Pseudo</Form.Label>
                    <Form.Control value={identifier} onChange={(e) => setIdentifier(e.currentTarget.value)} type="text" placeholder="Email.. / Pseudo.." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" placeholder="*****" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Connexion
                </Button>
            </Form>
        </Container>
    )
}
