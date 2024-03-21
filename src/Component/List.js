import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';
import server_url from '../config';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));
  
function Home(props) {
    const [rows, setRows] = useState([]);
    const post_type = "GET_INVENTORY_LIST";

    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await fetch(server_url + '/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ type: post_type }),
            });
      
            if (!response.ok) {
              throw new Error('Backend calculation failed');
            }
            const data = await response.json();
            setRows(data.result)
          } catch (error) {
            console.error('Error fetching data from backend:', error);
          }
        }
    useEffect(() => {
        getData();
    }, []);

    const deleteItem = async (id) => {
      try {
        const response = await fetch(server_url + '/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: id}),
        });
  
        if (!response.ok) {
          throw new Error('Backend delete operation is failed');
        }
  
        const data = await response.json();
        if (data.result !== "0") {
          let new_rows = rows.filter((item) => (item._id !== data.result) );
          setRows(new_rows);
        } else {

        }
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    }

    return  (
        <div className="body-margin">
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                      <TableRow>
                          <StyledTableCell align="center">No.</StyledTableCell>
                          <StyledTableCell align="center">Image</StyledTableCell>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">Quantity</StyledTableCell>
                          <StyledTableCell align="center">Operation</StyledTableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                      { rows.length > 0 && rows.map((row, index) => (
                          <StyledTableRow key={row._id}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>                              
                            <StyledTableCell align="center">
                              <img style={{ maxHeight: '100%', maxWidth: '100%', marginBottom: '20px' }} src={server_url + "/" + row.imageUrl} width={'100px'} height={'100px'} alt="img" />
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                            <StyledTableCell align="center">
                            <ButtonGroup disableElevation variant="contained" aria-label="Disabled button group">
                              <Stack direction="row" spacing={2}>
                                <Button color="secondary" endIcon={<SendIcon />} onClick={() =>{props.callback(row._id); navigate('/inventory/edit')}}>Update</Button>
                                <Button variant="outlined" color="error" endIcon={<DeleteIcon />} onClick={() => deleteItem(row._id)}>Delete</Button>
                              </Stack>
                            </ButtonGroup>
                            </StyledTableCell>
                          </StyledTableRow>
                      ))}
                      </TableBody>
                  </Table>
                  </TableContainer>
                  {
                    rows.length === 0 && (
                      <div className="mt-3">
                      <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">Oops! There is no any inventory. Please click CREATE button to add an inventory</Alert>
                      </Stack>
                      </div>
                    )
                  }
              </Grid>
              <Grid item container xs={12} justifyContent="center">
                <Stack direction="row" spacing={2}>
                  <Button variant="contained"  style={{ width : "30vw"}} endIcon={<SendIcon />} onClick={() => navigate('/inventory/add')} >C R E A T E</Button>
                </Stack>
              </Grid>
          </Grid>
        </div>
    )
}

export default Home;