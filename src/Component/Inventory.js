import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Grid, Typography, Button, TextField} from "@mui/material"
import server_url from '../config';

function Inventory(props) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState();

    const getData = async () => {
        try {
            const response = await fetch(server_url + '/get_inventory', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: props.id }),
            });
      
            if (!response.ok) {
              throw new Error('Backend calculation failed');
            }
      
            const data = await response.json();
            let item = data.result;
            setName(item.name);
            setQuantity(item.quantity);
            setImage(item.imageUrl);
          } catch (error) {
            console.error('Error fetching data from backend:', error);
          }
    }

    const uploadImage = async() => {
        const data = new FormData();
         
        if (file) {
            for (let i = 0; i < file.length; i++) {
                data.append('file', file[i])
            }
        } else {
          alert("image file is not selected");
          return;
        }
        try {
          const response = await fetch(server_url + '/upload/image', {
            method: 'POST',
            body: data,
          });
    
          if (!response.ok) {
            throw new Error('Backend operation failed');
          }
          
          const result = await response.json();
          
          return result.filename;


        } catch (error) {
          console.error('Error fetching data from backend:', error);
        }
    }

    const saveData = async() => {
      if (name === "") {
        alert("name & quantity fields required");
        return;
      }
      let filename = "";
      if(props.type === "add") {
        filename = await uploadImage();
      }
      
      try {
        const response = await fetch(server_url + '/save_inventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: props.id, name: name, quantity: quantity, filename: filename }),
        });
  
        if (!response.ok) {
          throw new Error('Backend calculation failed');
        }
        navigate('/inventory');
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }

    }

    const changeName = (event) => {
        setName(event.target.value);
    }
    const changeQuantity = (event) => {
        setQuantity(event.target.value);
    }
    const handleFileChange = (event) => {
        setFile(event.target.files);
      }
    
    useEffect(() => { 
      if (props.type === "edit") {
            getData();
        } else {

        }
    },[])
    const handleSubmit = async (event) => {
        event.preventDefault();
        saveData();
    }

    return (
        <div>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <Grid item container style={{marginTop:"5rem"}} justifyContent="center">
                            <Typography variant="h4">{ !props.id ? "CREATE": "UPDATE" } AN INVENTORY ITEM</Typography>
                        </Grid>
                        { props.id && image &&
                          <Grid item container style={{marginTop:"1rem"}} justifyContent="center">
                            <img style={{ maxHeight: '100%', maxWidth: '100%', marginBottom: '20px' }} src={server_url + "/" + image } alt="img" />
                          </Grid>
                        }
                        <Grid item container style={{marginTop:"1rem"}}>
                            <TextField id = "name" type="text" label="name" variant="outlined" fullWidth onChange={changeName} value={name} />
                        </Grid>
                        <Grid item container style={{marginTop:"1rem"}}>
                            <TextField id = "quantity" type="number" label="quantity" variant="outlined" fullWidth onChange={changeQuantity} value={quantity} />
                        </Grid>
                        { !props.id &&
                          <Grid item container style={{marginTop:"1rem"}}>
                          <input className="form-control mb-3" type="file" id="file" accept=".jpg" multiple onChange={handleFileChange} />
                          </Grid>
                        }
                        <Grid item xs={8} container style={{marginTop:"5rem", marginRight:"auto", marginLeft:"auto"}} justifyContent="center">
                            <Button variant="contained" fullWidth onClick={handleSubmit}>SAVE</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Inventory;