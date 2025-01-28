import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.left}>
          <h4>About IBCM</h4>
          <p>
            IBCM is an AI-powered platform designed to streamline construction monitoring, progress tracking, and compliance.
          </p>
        </div>
        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Progress classfication</a></li>
            <li><a href="#">3D Model</a></li>
            <li><a href="#">Geo Map</a></li>
            <li><a href="#">Worker Safety</a></li>
            <li><a href="#">Alerts</a></li>
            <li><a href="#">Dashboard</a></li>
          </ul>
        </div>
        <div className={styles.center}>
          <h4>Contact Us</h4>
          <p><strong>XYZ Technologies, Inc.</strong></p>
          <p>125 Technology Park<br />Lake Mary, FL 32746<br />India</p>
          <p>+91 9865748544</p>
          <p><a>info@ibcm.com</a></p>
        </div>
        <div className={styles.right}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a href="#"><img src="/icons/facebook.jpg" alt="Facebook" /></a>
            <a href="#"><img src="/icons/twitter.jpg" alt="Twitter" /></a>
            <a href="#"><img src="/icons/linkedin.png" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>© 2024 IBCM | Smart Construction Monitoring</p>
      </div>
    </footer>
  );
};

export default Footer;
