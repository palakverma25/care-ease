import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Demo Credentials: If using the demo credentials, bypass Firebase
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>C</div>
          <h1>CareEase</h1>
        </div>
        <div className={styles.heroText}>
          <h2>The future of B2B Healthcare is here.</h2>
          <p>Manage your patients, analyze health trends, and optimize your clinic operations with state-of-the-art tools.</p>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <ShieldCheck className={styles.featureIcon} />
            <span>HIPAA Compliant Security</span>
          </div>
        </div>
      </div>
      
      <div className={styles.rightPane}>
        <form className={`${styles.loginCard} glass`} onSubmit={handleLogin}>
          <div className={styles.header}>
            <LogIn size={32} color="var(--primary)" />
            <h2>Provider Login</h2>
            <p>Access your healthcare dashboard</p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input 
                type="email" 
                placeholder="dr.smith@clinic.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <p className={styles.switchText}>
            New provider? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
