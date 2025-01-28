"use client";
import {  Box,
    Grid,
    Typography,
    Paper,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tabs,
    Tab,
    Card,
    CardContent,
 } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend, ResponsiveContainer } from 'recharts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import ProjectIcon from '@mui/icons-material/Assignment';
import Rating from '@mui/material/Rating';
import React, { useState } from 'react';
import styles from '../../styles/Dashboard.module.css';

const userData = {
    name: "Rahul Kumar",
    email: "rahulkumar@example.com",
    role: "Project Manager",
    avatar: "/icons/profile.jpg",
    projects: "3 Ongoing Projects",
    ratings: 4.5
  };
  
  const contractorData = [
    { id: 1, name: "ABC Constructions", projects: 5, rating: 4.0, history: "Completed 5 large-scale projects, known for timely delivery." },
    { id: 2, name: "XYZ Builders", projects: 3, rating: 3.5, history: "Experienced in residential buildings, delayed in one project." },
  ];
  
const workProgressData = [
  { phase: 'Foundation', progress: 100 },
  { phase: 'Super Structure', progress: 80 },
  { phase: 'Furnishing', progress: 60 },
  { phase: 'Interior', progress: 40 },
];

const budgetData = [
  { name: "Spent", value: 70 },
  { name: "Remaining", value: 30 },
];

const timelineData = [
  { date: "Jan", progress: 10 },
  { date: "Feb", progress: 30 },
  { date: "Mar", progress: 50 },
  { date: "Apr", progress: 60 },
  { date: "May", progress: 80 },
  { date: "Jun", progress: 90 },
];

const COLORS = ['#FF8042', '#00C49F'];

export default function Dashboard() {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };
  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

     {/* User Profile Section */}
     <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className={styles.profileCard}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Avatar alt={userData.name} src={userData.avatar} sx={{ width: 120, height: 120 }} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6">{userData.name}</Typography>
                  <List>
                    <ListItem>
                      <PersonIcon sx={{ marginRight: '0.5rem' }} />
                      <ListItemText primary="Role" secondary={userData.role} />
                    </ListItem>
                    <ListItem>
                      <EmailIcon sx={{ marginRight: '0.5rem' }} />
                      <ListItemText primary="Email" secondary={userData.email} />
                    </ListItem>
                    <ListItem>
                      <WorkIcon sx={{ marginRight: '0.5rem' }} />
                      <ListItemText primary="Ongoing Projects" secondary={userData.projects} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Profile Info" />
                <Tab label="Projects" />
                <Tab label="Settings" />
              </Tabs>
            </Box>
            <Box sx={{ padding: '1rem' }}>
              {tabValue === 0 && <Typography>Welcome to your profile, {userData.name}.</Typography>}
              {tabValue === 1 && <Typography>You are managing {userData.projects}.</Typography>}
              {tabValue === 2 && <Typography>Settings: You can update your profile here.</Typography>}
            </Box>
          </Card>
        </Grid>
        </Grid>
      {/* Main Grid for Data Sections */}
      <Grid container spacing={4} sx={{ marginTop: '2rem' }}>
        
        {/* Work Progress Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h6">Work Progress by Phase</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workProgressData}>
                <XAxis dataKey="phase" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Budget Usage Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h6">Budget Allocation</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={budgetData} cx="50%" cy="50%" outerRadius={100} label>
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Project Timeline Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h6">Project Timeline (Progress Over Time)</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="progress" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

         {/* Contractor Details */}
         <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Contractor Details</Typography>
          {contractorData.map(contractor => (
            <Accordion key={contractor.id} sx={{ marginBottom: '1rem' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{contractor.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ProjectIcon sx={{ marginRight: '0.5rem' }} />
                    <ListItemText primary="Projects Completed" secondary={contractor.projects} />
                  </ListItem>
                  <ListItem>
                    <Rating name="contractor-rating" value={contractor.rating} precision={0.5} readOnly />
                    <ListItemText primary="Rating" sx={{ marginLeft: '0.5rem' }} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="History" secondary={contractor.history} />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
