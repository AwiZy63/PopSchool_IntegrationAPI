import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

export default function PostPage(props) {
    const { notify } = props;
    const { id } = useParams();
    const [post, setPost] = useState({});

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const result = await axios(`http://localhost:3030/posts/${id}`, {
                    method: "GET",
                });
                const date = new Date(result.data.post.createdAt);
                result.data.post.createdAt = date;
                setPost(result.data.post);
            } catch (error) {
                if (error.response.status === 404) {
                    notify(`Le post n'existe pas`, "error");
                    navigate("/");
                } else {
                    notify(`Une erreur est survenue ${error?.response?.data?.message || ""}`, "error");
                    navigate("/");
                }
            }
        }

        fetchPost();
    }, [])

    if (!post.title) return (<Container>Loading...</Container>);
    return (
        <Container>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <pre>Posté le : {post.createdAt.toLocaleDateString()}</pre>
        </Container>
    )
}
