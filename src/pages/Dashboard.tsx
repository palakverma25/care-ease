import { Users, Calendar, Activity, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.css';

const data = [
  { name: 'Mon', patients: 4000 },
  { name: 'Tue', patients: 3000 },
  { name: 'Wed', patients: 2000 },
  { name: 'Thu', patients: 2780 },
  { name: 'Fri', patients: 1890 },
  { name: 'Sat', patients: 2390 },
  { name: 'Sun', patients: 3490 },
];

const Dashboard = () => {
  return (
    <div className={`${styles.container} fade-in`}>
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statInfo}>
            <p>Total Patients</p>
            <h3>1,284</h3>
            <span className={styles.trend}>+12.5% vs last month</span>
          </div>
          <div className={`${styles.statIcon} ${styles.patients}`}>
            <Users size={24} />
          </div>
        </div>
        
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statInfo}>
            <p>Appointments</p>
            <h3>42</h3>
            <span className={styles.trend}>8 scheduled for today</span>
          </div>
          <div className={`${styles.statIcon} ${styles.appointments}`}>
            <Calendar size={24} />
          </div>
        </div>

        <div className={`${styles.statCard} glass`}>
          <div className={styles.statInfo}>
            <p>Critical Cases</p>
            <h3>5</h3>
            <span className={styles.negativeTrend}>2 requires immediate attention</span>
          </div>
          <div className={`${styles.statIcon} ${styles.critical}`}>
            <Activity size={24} />
          </div>
        </div>

        <div className={`${styles.statCard} glass`}>
          <div className={styles.statInfo}>
            <p>Growth Rate</p>
            <h3>24%</h3>
            <span className={styles.trend}>New providers joined</span>
          </div>
          <div className={`${styles.statIcon} ${styles.growth}`}>
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={`${styles.chartContainer} glass`}>
          <div className={styles.chartHeader}>
            <h3>Patient Inflow Trends</h3>
            <p>Daily patient registrations and visits</p>
          </div>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid var(--border-glass)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Area type="monotone" dataKey="patients" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPatients)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${styles.recentPatients} glass`}>
          <div className={styles.chartHeader}>
            <h3>Upcoming Appointments</h3>
          </div>
          <div className={styles.appointmentList}>
            {[
              { name: 'Alice Johnson', time: '09:00 AM', type: 'Checkup' },
              { name: 'Robert Smith', time: '10:30 AM', type: 'Surgery' },
              { name: 'Emma Wilson', time: '01:00 PM', type: 'Consultation' },
              { name: 'David Brown', time: '03:15 PM', type: 'Follow-up' },
            ].map((app, i) => (
              <div key={i} className={styles.appointmentItem}>
                <div className={styles.appInfo}>
                  <strong>{app.name}</strong>
                  <span>{app.type}</span>
                </div>
                <div className={styles.appTime}>{app.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
