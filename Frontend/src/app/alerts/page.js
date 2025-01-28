"use client";
import React, { useState } from 'react';
import { Alert, Box, Grid, Typography, Paper, Button, Divider, Badge, Modal, IconButton, Avatar, Card, CardContent, Tab, Tabs, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles/Alerts.module.css';

const alertData = {
  critical: [
    { id: 1, message: "Construction delayed by 7 days", description: "Work on the foundation is delayed due to weather conditions.", timestamp: "10 minutes ago", resolved: false },
    { id: 2, message: "Incorrect construction material detected", description: "Wrong cement mix detected in the last batch.", timestamp: "30 minutes ago", resolved: false },
  ],
  warning: [
    { id: 1, message: "Progress falling behind schedule", description: "Electrical work is 20% behind the expected progress.", timestamp: "2 hours ago", resolved: false },
  ],
  info: [
    { id: 1, message: "New construction phase started", description: "Plumbing phase has been initiated successfully.", timestamp: "4 hours ago", resolved: false },
    { id: 2, message: "Safety compliance met", description: "All workers are following safety protocols as of today.", timestamp: "6 hours ago", resolved: false },
  ],
};

const resolvedData = [];

export default function Alerts() {
  const [selectedCategory, setSelectedCategory] = useState('critical');
  const [openModal, setOpenModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  const handleOpenModal = (alert) => {
    setSelectedAlert(alert);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const renderAlerts = (category) => {
    return alertData[category].map((alert) => (
      <Paper key={alert.id} className={styles.alertCard} elevation={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" onClick={() => handleOpenModal(alert)} className={styles.clickableAlert}>
              {alert.message}
            </Typography>
            <Typography variant="body2" color="textSecondary">{alert.description}</Typography>
            <Typography variant="caption" color="textSecondary">{alert.timestamp}</Typography>
          </Box>
          {/* <Badge color={category === 'critical' ? 'error' : category === 'warning' ? 'warning' : 'info'} badgeContent={category.toUpperCase()} /> */}
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
          <Button variant="outlined" color="primary" size="small" sx={{ marginRight: '0.5rem' }} onClick={() => resolveAlert(alert)}>
            Resolve
          </Button>
          <Button variant="outlined" color="secondary" size="small">Investigate</Button>
        </Box>
      </Paper>
    ));
  };

  const resolveAlert = (alert) => {
    alert.resolved = true;
    resolvedData.push(alert);
  };

  const renderResolvedAlerts = () => {
    return resolvedData.map((alert) => (
      <Paper key={alert.id} className={styles.alertCardResolved} elevation={1}>
        <Typography variant="body1">{alert.message}</Typography>
        <Typography variant="caption" color="textSecondary">Resolved</Typography>
      </Paper>
    ));
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Alerts & Notifications</Typography>

      {/* Filter Buttons */}
      <Box className={styles.filterContainer}>
        <Button
          variant={selectedCategory === 'critical' ? 'contained' : 'outlined'}
          color="error"
          startIcon={<ErrorIcon />}
          onClick={() => setSelectedCategory('critical')}
        >
          Critical
        </Button>
        <Button
          variant={selectedCategory === 'warning' ? 'contained' : 'outlined'}
          color="warning"
          startIcon={<WarningIcon />}
          onClick={() => setSelectedCategory('warning')}
        >
          Warning
        </Button>
        <Button
          variant={selectedCategory === 'info' ? 'contained' : 'outlined'}
          color="info"
          startIcon={<InfoIcon />}
          onClick={() => setSelectedCategory('info')}
        >
          Info
        </Button>
      </Box>

      <Divider sx={{ margin: '1rem 0' }} />

      {/* Alerts Section */}
      <Grid container spacing={3}>
        {renderAlerts(selectedCategory)}
      </Grid>

      {/* Resolved Alerts */}
      {resolvedData.length > 0 && (
        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant="h6">Resolved Alerts</Typography>
          {renderResolvedAlerts()}
        </Box>
      )}

      {/* Modal for Detailed Alert */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="alert-modal-title" aria-describedby="alert-modal-description">
        <Box className={styles.modalBox}>
          <Typography id="alert-modal-title" variant="h6">{selectedAlert?.message}</Typography>
          <Typography id="alert-modal-description" sx={{ mt: 2 }}>{selectedAlert?.description}</Typography>
          <Typography variant="caption" color="textSecondary" sx={{ marginTop: '1rem' }}>{selectedAlert?.timestamp}</Typography>
          <Box sx={{ textAlign: 'right', marginTop: '1rem' }}>
            <Button onClick={handleCloseModal} color="primary">Close</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
