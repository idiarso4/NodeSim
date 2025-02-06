import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';

const PermissionForm = () => {
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    type: 'sick',
    reason: '',
    attachmentUrl: ''
  });
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/permissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPermissions(response.data);
    } catch (err) {
      setError('Failed to fetch permissions');
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/permissions', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Permission request submitted successfully');
      setFormData({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        type: 'sick',
        reason: '',
        attachmentUrl: ''
      });
      fetchPermissions();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit permission request');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Permission Request</Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                name="startDate"
                label="Start Date"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                name="endDate"
                label="End Date"
                value={formData.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Type"
                >
                  <MenuItem value="sick">Sick Leave</MenuItem>
                  <MenuItem value="personal">Personal Leave</MenuItem>
                  <MenuItem value="official">Official Business</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="reason"
                label="Reason"
                value={formData.reason}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="attachmentUrl"
                label="Attachment URL"
                value={formData.attachmentUrl}
                onChange={handleChange}
                helperText="Upload supporting documents if any"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit Permission Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Recent Permission Requests</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{new Date(permission.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(permission.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{permission.type}</TableCell>
                <TableCell>{permission.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PermissionForm;