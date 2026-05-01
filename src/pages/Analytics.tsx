import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './Analytics.module.css';

const performanceData = [
  { month: 'Jan', revenue: 4000, efficiency: 85 },
  { month: 'Feb', revenue: 3000, efficiency: 88 },
  { month: 'Mar', revenue: 5000, efficiency: 92 },
  { month: 'Apr', revenue: 4500, efficiency: 90 },
  { month: 'May', revenue: 6000, efficiency: 95 },
];

const patientDemographics = [
  { name: 'Pediatric', value: 400 },
  { name: 'Adult', value: 300 },
  { name: 'Geriatric', value: 300 },
];

const COLORS = ['#10b981', '#6366f1', '#f43f5e'];

const Analytics = () => {
  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h2>Operational Analytics</h2>
        <p>Insights into clinic performance and patient demographics</p>
      </header>

      <div className={styles.grid}>
        <div className={`${styles.card} glass`}>
          <h3>Revenue & Efficiency</h3>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid var(--border-glass)', borderRadius: '8px' }}
                />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="efficiency" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${styles.card} glass`}>
          <h3>Patient Demographics</h3>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientDemographics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {patientDemographics.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid var(--border-glass)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.legend}>
              {patientDemographics.map((d, i) => (
                <div key={i} className={styles.legendItem}>
                  <div className={styles.dot} style={{ backgroundColor: COLORS[i] }}></div>
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.fullCard} glass`}>
        <h3>Key Performance Indicators</h3>
        <div className={styles.kpiGrid}>
          <div className={styles.kpi}>
            <span>Avg. Wait Time</span>
            <strong>12 min</strong>
            <p className={styles.up}>-2 min from last week</p>
          </div>
          <div className={styles.kpi}>
            <span>Patient Satisfaction</span>
            <strong>4.8/5</strong>
            <p className={styles.up}>+0.2 from last month</p>
          </div>
          <div className={styles.kpi}>
            <span>Staff Utilization</span>
            <strong>92%</strong>
            <p className={styles.down}>Stable</p>
          </div>
          <div className={styles.kpi}>
            <span>No-show Rate</span>
            <strong>4%</strong>
            <p className={styles.up}>-1% improvement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
