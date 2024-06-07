import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const CategorySelector = ({ selectedCategory, setSelectedCategory, selectedGroup, setSelectedGroup }) => {
    const [categories, setCategories] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://emojihub.yurace.pro/api/all');
            const data = await response.json();
            const categoryNames = [...new Set(data.map(emoji => emoji.category))];
            setCategories(categoryNames);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchGroups = async () => {
                const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${selectedCategory}`);
                const data = await response.json();
                const groupNames = [...new Set(data.map(emoji => emoji.group))];
                setGroups(groupNames);
            };

            fetchGroups();
        } else {
            setGroups([]);
        }
    }, [selectedCategory]);

    return (
        <Form>
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="categorySelect">
                        <Form.Label>
                            <h2 className="my-4 text-secondary">Category</h2>
                        </Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="secondary" onClick={() => { setSelectedCategory(''); setSelectedGroup(''); }}>
                Clear Selection
            </Button>
        </Form>
    );
};

export default CategorySelector;
