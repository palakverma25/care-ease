import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LayoutDashboard, Users, BarChart3, LogOut, Bell, Menu, X } from 'lucide-react';
import styles from './Layout.module.css';

const Layout = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const triggerNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('CareEase Update', {
            body: 'New patient data is available in the dashboard.',
            icon: '/vite.svg'
          });
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''} glass`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>C</div>
            <span>CareEase</span>
          </div>
          <button 
            className={styles.closeBtn} 
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/patients" className={({ isActive }) => isActive ? styles.active : ''}>
            <Users size={20} />
            <span>Patients</span>
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? styles.active : ''}>
            <BarChart3 size={20} />
            <span>Analytics</span>
          </NavLink>
        </nav>

        <div className={styles.footer}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={`${styles.header} glass`}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <button 
                className={styles.menuBtn} 
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h1>Welcome, {user?.email?.split('@')[0] || 'Provider'}</h1>
            </div>
            <div className={styles.headerActions}>
              <button onClick={triggerNotification} className={styles.notifBtn}>
                <Bell size={20} />
              </button>
              <div className={styles.userProfile}>
                <img src={`https://ui-avatars.com/api/?name=${user?.email}&background=10b981&color=fff`} alt="User" />
              </div>
            </div>
          </div>
        </header>
        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
