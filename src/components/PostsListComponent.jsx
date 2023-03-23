import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PostsListComponent(props) {
    const { isLogged, notify, accessToken } = props;
    const [posts, setPosts] = useState([]);

    const [postsTypes, setPostsTypes] = useState([
    ])

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postType, setPostType] = useState("");

    useEffect(() => {
        const fetchPostsTypes = async () => {
            try {
                const result = await axios("http://localhost:3030/post-types", {
                    method: "GET",
                });

                setPostsTypes(result.data.postsTypes);
            } catch (error) {
                notify(`Une erreur est survenue ${error?.response?.data?.message || ""}`, "error");
            }
        }

        const fetchPosts = async () => {
            try {
                const result = await axios("http://localhost:3030/posts", {
                    method: "GET",
                });

                setPosts(result.data.posts);
            } catch (error) {
                notify(`Une erreur est survenue ${error?.response?.data?.message || ""}`, "error");
            }
        }

        fetchPosts();
        fetchPostsTypes();
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(title, content, postType)

        console.log(posts)

        // Envoyer les données au serveur
        axios("http://localhost:3030/posts/create", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                title: title,
                content: content,
                postType: postType,
            }
        }).then((res) => {
            console.log(res);
            setTitle("");
            setContent("");
            setPostType("");


            setPosts([...posts, {
                id: posts.length + 1,
                title: title,
                content: content,
                postType: postType,
                postedBy: res.data.data.postedBy,
                createdAt: new Date()
            }]);

            handleClose();
            notify("Post créé", "success");
        }).catch((err) => {
            notify(`Une erreur est survenue ${err?.response?.data?.message || ""}`, "error");
        });

    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <section>
                <h2>Posts</h2>
                {isLogged ?
                    (<>
                        <Button onClick={handleShow}>Créer un post</Button>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Modal.Body>


                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Titre</Form.Label>
                                            <Form.Control value={title} onChange={(e) => setTitle(e.currentTarget.value)} type="text" placeholder="Titre du post" />
                                        </Form.Group>

                                        <Form.Group className='mb-3' as={Col} controlId="formGridPassword">
                                            <Form.Label>Type de post</Form.Label>
                                            <Form.Select value={postType} onChange={(e) => setPostType(e.currentTarget.value)} aria-label="Type de post">
                                                <option>Séléctionner</option>
                                                {postsTypes.map((postType) => (
                                                    <option key={postType.id} value={postType.id}>{postType.name}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group controlId='formTextarea'>
                                            <Form.Label>Contenu</Form.Label>
                                            <Form.Control
                                                value={content} onChange={(e) => setContent(e.currentTarget.value)}
                                                as="textarea"
                                                placeholder="...."
                                                style={{ height: '100px' }}
                                            />
                                        </Form.Group>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button type='submit' variant="primary">Créer le post</Button>
                                </Modal.Footer>
                            </Form>
                        </Modal>
                    </>) : null}
                <div className="posts__container">
                    {posts && posts.length > 0 ? posts.map((post) => (
                        <Card key={post.id} className="mb-3">
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    {post.content}
                                </Card.Text>
                                <Link to={`/post/${post.id}`}>Voir le post</Link>
                            </Card.Body>
                        </Card>
                    )) : <p>Aucun post</p>}
                </div>
            </section>

        </>
    )
}
