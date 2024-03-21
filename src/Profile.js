import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Avatar from './Avartar.jpg';
import server_url from './config';

function Profile() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');

  const handleEdit = (event) => {
    setEdit(!edit);
  }

  const changeName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  }

  const changeBio = (event) => {
    setBio(event.target.value);
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect( () => {    
    setImage(Avatar);
    setName("Diego Costa");
    setBio("webpage that includes input fields for two numbers. You need to perform\
    the addition of those two numbers and display the output in 2 ways. The first output\
    is calculated at the front end. The second output is calculated at the backend and\
    should send a response of addition to the frontend and render here")
  }, []);

  return (
    <div style={{ margin: 'auto', paddingTop: '50px' }} >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button
          className="btn btn-secondary"
          onClick={handleEdit}
        >{edit ? 'View' : 'Edit'}</button>
      </div>
      {
        edit ?
          <form>
            <div className="row mb-3">
              <div className="col-md-4">
                {image ? <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={image} alt="img" /> :
                  <img style={{ maxHeight: '100%', maxWidth: '100%', marginBottom: '20px' }} src={server_url + '/images/Avartar.jpg'} alt="img" />}
                
              </div>
              <div className="col-md-8">
                <div className='mb-3'>
                  <input type="text" className="form-control" onChange={changeName} value={name}></input>
                </div>
                <div className='mb-3'>
                  <textarea className="form-control" style={{ minHeight: '200px' }} onChange={changeBio} value={bio}></textarea>
                </div>
              </div>
            </div>
            
          </form> :
          <div className="row mb-3">
            <div className="col-md-4">
              {image ? <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={image} alt="img" /> :
                <img style={{ maxHeight: '100%', maxWidth: '100%', marginBottom: '20px' }} src={Avatar} alt="img" />}
            </div>
            <div className="col-md-8">
              <h3>{name}</h3>
              {bio}
            </div>
          </div>
      }
    </div>
  );
}

export default Profile;