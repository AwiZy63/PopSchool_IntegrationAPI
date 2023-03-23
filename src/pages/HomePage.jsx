import React from 'react'
import { Container } from 'react-bootstrap'
import PostsListComponent from '../components/PostsListComponent';

export default function HomePage(props) {
  const { isLogged, accessToken, notify } = props;
  return (
    <Container>
      <h1>Accueil</h1>

      <PostsListComponent accessToken={accessToken} notify={notify} isLogged={isLogged} />
    </Container>
  )
}
