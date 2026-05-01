import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import styles from './Login.module.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
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
          <h2>Join the future of Healthcare.</h2>
          <p>Create your provider account and start managing your clinic with ease.</p>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <ShieldCheck className={styles.featureIcon} />
            <span>Secure & HIPAA Compliant</span>
          </div>
        </div>
      </div>
      
      <div className={styles.rightPane}>
        <form className={`${styles.loginCard} glass`} onSubmit={handleSignUp}>
          <div className={styles.header}>
            <h2>Create Account</h2>
            <p>Register as a healthcare provider</p>
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className={styles.switchText}>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
