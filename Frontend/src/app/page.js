import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <Typography variant="h1" gutterBottom>
            IBCM Major Project
          </Typography>
          <Typography variant="h5" paragraph>
            AI-Powered Construction Monitoring
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <Typography variant="h2" gutterBottom>
          Platform Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={styles.featureCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📷 Image Upload & Categorization
                </Typography>
                <Typography variant="body1">
                  Upload construction site images for automatic categorization by stage.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={styles.featureCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📊 Real-Time Progress Tracking
                </Typography>
                <Typography variant="body1">
                  Track progress in real-time with AI-powered insights and visual reports.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={styles.featureCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ⚠️ Alerts & Notifications
                </Typography>
                <Typography variant="body1">
                  Receive alerts for image errors, delays, and compliance issues.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={styles.featureCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🗺 Geo-Tagged Site Map
                </Typography>
                <Typography variant="body1">
                  View construction sites on a geo-tagged, color-coded map.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={styles.featureCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  👷 Worker Safety Compliance
                </Typography>
                <Typography variant="body1">
                  Detect worker safety compliance through AI.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={styles.featureCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🔍 3D Model Comparison
                </Typography>
                <Typography variant="body1">
                  Compare 3D models with real-time progress to ensure on-track delivery.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={styles.featureCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🚀 AR/VR Visualization
                </Typography>
                <Typography variant="body1">
                  AR/VR visualization to explore and plan future construction stages.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    </main>
  );
}
