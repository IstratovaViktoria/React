import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CategorySelector from './components/CategorySelector';
import EmojiList from './components/EmojiList';
import EmojiGenerator from './components/EmojiGenerator';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  return (
    <Router>
      <div style={{ backgroundColor: '#f3f0ff', color: '#6a6a6a', minHeight: '100vh' }}>
        <Navbar style={{ backgroundColor: '#c4b5fd' }} variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Emoji App</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/random">Random Emoji</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container className="py-4">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <CategorySelector
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                  />
                  <EmojiList
                    endpoint={
                      selectedGroup
                        ? `https://emojihub.yurace.pro/api/all/group/${selectedGroup}`
                        : selectedCategory
                        ? `https://emojihub.yurace.pro/api/all/category/${selectedCategory}`
                        : 'https://emojihub.yurace.pro/api/all'
                    }
                  />
                </>
              } 
            />
            <Route path="/random" element={<EmojiGenerator />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;

