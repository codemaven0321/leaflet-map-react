import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import Profile from './Profile';
import Addition from './Addition';
import List from './Component/List';
import Inventory from './Component/Inventory';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./logo.svg"

function App() {
const [id, setId] = useState("");

const changeId = (id) => {
  setId(id);
}
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container" style={{ justifyContent: 'flex-start' }}>
            <div>
              <Link className="navbar-brand" to="/">
                <img style={{ height: '60px', width: '60px' }} src={Logo} alt="logo" />
                Inventory App
              </Link>
            </div>&nbsp;&nbsp;
            <div>
              <Link className="navbar-brand nav-link link" to="/">
                Profile
              </Link>
            </div>
            <div>
              <Link className="navbar-brand nav-link link" to="/addition">
                Addition
              </Link>
            </div>
            <div>
              <Link className="navbar-brand nav-link link" to="/inventory">
                Inventory
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-shrink-0">
          <div className="container" style={{maxWidth: '1000px'}}>
            <Routes>
              <Route exact path="/" element={<Profile />} />
              <Route path="/addition" element={<Addition />} />
              <Route exact path='/inventory' element={<List callback={changeId} />} />
              <Route path='/inventory/add' element={<Inventory type="add" />} />
              <Route path='/inventory/edit' element={<Inventory type="edit" id={id} />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
