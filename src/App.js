import React, { useState } from 'react';
import './App.css';
import { 
  Container, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function App() {
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const placeholderData = [
    { address: '5G9f8ERDdzx2', balance: '100 DOT', status: 'Active' },
    { address: '1Gf37sdfG9x2', balance: '200 DOT', status: 'Inactive' },
    { address: '8Gf1sdfD4s9d', balance: '150 DOT', status: 'Active' },
  ];

  const handleAddAddress = () => {
    if (address.trim() !== '') {
      setAddresses([...addresses, address.trim()]);
      setAddress('');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Polkadot Address Report', 14, 20);
    doc.autoTable({
      startY: 30,
      head: [['Address', 'Balance', 'Status']],
      body: placeholderData.map(row => [row.address, row.balance, row.status]),
    });
    doc.save('polkadot-addresses.pdf');
  };

  return (
    <Container maxWidth="lg" className="container">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img 
          src={`${process.env.PUBLIC_URL}/takeout.png`} 
          alt="Takeout Graphic" 
          style={{ maxWidth: '100%', height: 'auto', opacity: 0.3, position: 'fixed', zIndex: -1, left: 0, right: 0, top: 0, bottom: 0 }}
        />
      </div>
      
      <Paper elevation={3} className="MuiPaper-root">
        <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#333', marginBottom: '30px' }}>
          Polkadot Takeout
        </Typography>
        <TextField
          label="Enter Polkadot SS58 Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '8px' }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleAddAddress} style={{ marginBottom: '30px', padding: '12px 0', fontSize: '16px', fontWeight: 'bold' }}>
          Add Address
        </Button>
        <Typography variant="h6" align="center" gutterBottom style={{ color: '#333', fontWeight: '600', marginBottom: '20px' }}>
          Stored Addresses
        </Typography>
        <List>
          {addresses.map((addr, index) => (
            <ListItem key={index} style={{ backgroundColor: '#f4f4f4', marginBottom: '10px', borderRadius: '8px', padding: '15px' }}>
              <ListItemText primary={addr} style={{ color: '#333' }} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" align="center" gutterBottom style={{ color: '#333', fontWeight: '600', marginTop: '40px' }}>
          Address Details
        </Typography>
        {/* <TableContainer component={Paper} className="MuiTableContainer-root"> */}
          <Table className="MuiTable-root">
            <TableHead className="MuiTableHead-root">
              <TableRow>
                <TableCell style={{ color: '#333', fontWeight: 'bold' }}>Address</TableCell>
                <TableCell style={{ color: '#333', fontWeight: 'bold' }} align="right">Balance</TableCell>
                <TableCell style={{ color: '#333', fontWeight: 'bold' }} align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {placeholderData.map((row, index) => (
                <TableRow key={index} hover style={{ transition: 'background-color 0.3s ease' }}>
                  <TableCell component="th" scope="row" style={{ color: '#333' }}>
                    {row.address}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#333' }}>{row.balance}</TableCell>
                  <TableCell align="right" style={{ color: row.status === 'Active' ? '#28a745' : '#dc3545' }}>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        {/* </TableContainer> */}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleDownloadPDF}
          style={{ marginTop: '30px', padding: '12px 0', fontSize: '16px', fontWeight: 'bold' }}
        >
          Download as PDF
        </Button>
      </Paper>
    </Container>
  );
}

export default App;
