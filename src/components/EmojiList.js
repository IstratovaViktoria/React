import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const EmojiList = ({ endpoint }) => {
    const [emojis, setEmojis] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmojis = async () => {
            setLoading(true);
            const response = await fetch(endpoint);
            const data = await response.json();
            setEmojis(data);
            setLoading(false);
        };

        fetchEmojis();
    }, [endpoint]);

    const decodeHtmlEntity = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <Container>
            <h2 className="my-4 text-secondary">Emoji List</h2>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row>
                    {emojis.map((emoji, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>{emoji.name}</Card.Title>
                                    <Card.Text style={{ fontSize: '2rem' }}>
                                        {decodeHtmlEntity(emoji.htmlCode[0])}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Category:</strong> {emoji.category}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default EmojiList;
