import DesignPanel from './components/DesignPanel';
import Main from './components/Main';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <DesignPanel>
      <Router>
        <Routes>
          <Route path='/' exect Component={Main} />
          <Route path='/panel' Component={DesignPanel} />
        </Routes>
      </Router>
    </DesignPanel>
  );
}

export default App;
