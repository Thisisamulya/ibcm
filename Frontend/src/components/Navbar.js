import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">IBCM</Link>
      </div>
      <ul className={styles.navLinks}>
      <li><Link href="/">Home</Link></li>
        <li><Link href="/progress-classfication">Progress classfication</Link></li>
        <li><Link href="/3dmodel">3D Model</Link></li>
        <li><Link href="/geo-tag-map">Geo Map</Link></li>
        <li><Link href="/workersafety">Worker Safety</Link></li>
        <li><Link href="/alerts">Alerts</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
