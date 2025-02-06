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

const AttendanceForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    timeIn: '',
    timeOut: '',
    status: 'present',
    notes: ''
  });
  const [attendances, setAttendances] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAttendances = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/attendance', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendances(response.data);
    } catch (err) {
      setError('Failed to fetch attendance records');
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/attendance', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Attendance recorded successfully');
      setFormData({
        date: new Date().toISOString().split('T')[0],
        timeIn: '',
        timeOut: '',
        status: 'present',
        notes: ''
      });
      fetchAttendances();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to record attendance');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Attendance Record</Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                name="date"
                label="Date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="time"
                name="timeIn"
                label="Time In"
                value={formData.timeIn}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="time"
                name="timeOut"
                label="Time Out"
                value={formData.timeOut}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="present">Present</MenuItem>
                  <MenuItem value="late">Late</MenuItem>
                  <MenuItem value="absent">Absent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="notes"
                label="Notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit Attendance
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Recent Attendance Records</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time In</TableCell>
              <TableCell>Time Out</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances.map((attendance) => (
              <TableRow key={attendance.id}>
                <TableCell>{new Date(attendance.date).toLocaleDateString()}</TableCell>
                <TableCell>{attendance.timeIn}</TableCell>
                <TableCell>{attendance.timeOut}</TableCell>
                <TableCell>{attendance.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttendanceForm;