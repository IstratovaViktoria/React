import React, { useState } from 'react';
import { Container, Button, Card, Spinner } from 'react-bootstrap';

const EmojiGenerator = () => {
    const [emoji, setEmoji] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchRandomEmoji = async () => {
        setLoading(true);
        const response = await fetch('https://emojihub.yurace.pro/api/random');
        const data = await response.json();
        setEmoji(data);
        setLoading(false);
    };

    const decodeHtmlEntity = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <Container className="my-4">
            <Button
                variant="secondary"
                className="mb-4"
                onClick={fetchRandomEmoji}
                disabled={loading}
            >
                {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Generate Random Emoji'}
            </Button>
            {emoji && (
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
            )}
        </Container>
    );
};

export default EmojiGenerator;



