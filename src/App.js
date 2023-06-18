import React from 'react';
import Score from './ScoreComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HorizontalMenu from './NavigationMenuComponent'
import ImageWithText from './ImageComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HorizontalMenu />
        <Routes>
          <Route path="/Wyniki" element={<Score />} />
          <Route path="/" element={<ImageWithText />} />

        </Routes>
    </div>
    </BrowserRouter>
    
  );
  
}


export default App;
