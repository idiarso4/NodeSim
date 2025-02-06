import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  EventNote as JournalIcon,
  AccessTime as AttendanceIcon,
  AssignmentTurnedIn as PermissionIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" component="div" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" color={color}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Overview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    journalCount: 0,
    attendanceCount: 0,
    permissionCount: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch statistics
        const statsResponse = await axios.get('http://localhost:5000/api/dashboard/stats', { headers });
        setStats(statsResponse.data);

        // Fetch recent activities
        const activitiesResponse = await axios.get('http://localhost:5000/api/dashboard/activities', { headers });
        setRecentActivities(activitiesResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Welcome back, {user?.name}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Journal Entries"
            value={stats.journalCount}
            icon={<JournalIcon color="primary" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Attendance Records"
            value={stats.attendanceCount}
            icon={<AttendanceIcon color="success" />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Permission Requests"
            value={stats.permissionCount}
            icon={<PermissionIcon color="warning" />}
            color="warning"
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Activities
        </Typography>
        <List>
          {recentActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem>
                <ListItemText
                  primary={activity.description}
                  secondary={new Date(activity.createdAt).toLocaleDateString()}
                />
              </ListItem>
              {index < recentActivities.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {recentActivities.length === 0 && (
            <ListItem>
              <ListItemText primary="No recent activities" />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Overview;