import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';

const JournalForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    subject: '',
    class: '',
    lessonTopic: '',
    teachingMaterials: '',
    activities: '',
    notes: ''
  });
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/journals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJournals(response.data);
    } catch (err) {
      setError('Failed to fetch journals');
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/journals', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Journal entry created successfully');
      setFormData({
        date: new Date().toISOString().split('T')[0],
        subject: '',
        class: '',
        lessonTopic: '',
        teachingMaterials: '',
        activities: '',
        notes: ''
      });
      fetchJournals();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create journal entry');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Teacher's Journal</Typography>
      
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="class"
                label="Class"
                value={formData.class}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="lessonTopic"
                label="Lesson Topic"
                value={formData.lessonTopic}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="teachingMaterials"
                label="Teaching Materials"
                value={formData.teachingMaterials}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="activities"
                label="Activities"
                value={formData.activities}
                onChange={handleChange}
                multiline
                rows={2}
              />
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
                Submit Journal Entry
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Recent Journal Entries</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Lesson Topic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journals.map((journal) => (
              <TableRow key={journal.id}>
                <TableCell>{new Date(journal.date).toLocaleDateString()}</TableCell>
                <TableCell>{journal.subject}</TableCell>
                <TableCell>{journal.class}</TableCell>
                <TableCell>{journal.lessonTopic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JournalForm;