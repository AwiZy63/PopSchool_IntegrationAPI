import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios';

export default function SignupPage(props) {
    const { notify } = props;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            notify("Les mots de passe ne correspondent pas", "warning");
            return;
        }

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            username: username,
        }

        if (Object.values(userData).includes("")) {
            notify("Veuillez remplir tous les champs", "warning");
            return;
        }

        notify("Inscription en cours...", "info");

        // Envoi des données au serveur
        axios("http://localhost:3030/users/signup", {
            method: "POST",
            data: userData,
        }).then((res) => {
            console.log(res);
            notify("Inscription réussie", "success");
            
            setUsername("");
            setPassword("");
            setPasswordConfirm("");
            setEmail("");
            setFirstName("");
            setLastName("");
            navigate("/signin");
        }).catch((err) => {
            notify(`Une erreur est survenue ${err?.response?.data?.message || ""}`, "error");
        });
        // Rediriger l'utilisateur vers la page de connexion
        
    }

    return (
        // firstName, lastName, email, password, username
        <Container className='mt-4'>
            <h1>Inscription</h1>
            <Form onSubmit={(e) => handleSubmit(e)} className='mt-4'>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Control value={username} onChange={(e) => setUsername(e.currentTarget.value)} type="text" placeholder="Pseudo" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.currentTarget.value)} type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstname">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} type="text" placeholder="Prénom" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicLastname">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} type="text" placeholder="Nom" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" placeholder="*****" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirmation de mot de passe</Form.Label>
                    <Form.Control value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.currentTarget.value)} type="password" placeholder="*****" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Inscription
                </Button>
            </Form>
        </Container>
    )
}
