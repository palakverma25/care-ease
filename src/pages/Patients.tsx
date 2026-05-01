import { useState } from 'react';
import { LayoutGrid, List, Search, Plus, MoreVertical } from 'lucide-react';
import styles from './Patients.module.css';
import AddPatientModal from '../components/AddPatientModal';

const initialPatients = [
  { id: 1, name: 'Alice Johnson', age: 28, gender: 'Female', condition: 'Hypertension', status: 'Stable', lastVisit: '2024-03-15' },
  { id: 2, name: 'Robert Smith', age: 45, gender: 'Male', condition: 'Diabetes Type 2', status: 'Critical', lastVisit: '2024-03-20' },
  { id: 3, name: 'Emma Wilson', age: 32, gender: 'Female', condition: 'Asthma', status: 'Stable', lastVisit: '2024-03-18' },
  { id: 4, name: 'David Brown', age: 54, gender: 'Male', condition: 'Recovery', status: 'Stable', lastVisit: '2024-03-22' },
  { id: 5, name: 'Sarah Davis', age: 24, gender: 'Female', condition: 'Influenza', status: 'Under Observation', lastVisit: '2024-03-21' },
  { id: 6, name: 'Michael Miller', age: 62, gender: 'Male', condition: 'Heart Disease', status: 'Critical', lastVisit: '2024-03-19' },
];

const Patients = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState(initialPatients);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSavePatient = (data: any) => {
    const patientToAdd = {
      id: patients.length + 1,
      ...data,
      age: parseInt(data.age as string),
      status: 'Stable',
      lastVisit: new Date().toISOString().split('T')[0],
    };
    
    setPatients([patientToAdd, ...patients]);
    setIsModalOpen(false);

    // Trigger notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Patient Added', {
        body: `${patientToAdd.name} has been successfully added to the system.`,
        icon: '/vite.svg'
      });
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h2>Patient Management</h2>
          <p>You have {filteredPatients.length} patients under your care</p>
        </div>
        <div className={styles.actions}>
          <div className={styles.searchWrapper}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.toggleGroup}>
            <button 
              className={view === 'grid' ? styles.active : ''} 
              onClick={() => setView('grid')}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={view === 'list' ? styles.active : ''} 
              onClick={() => setView('list')}
            >
              <List size={18} />
            </button>
          </div>
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Add Patient</span>
          </button>
        </div>
      </header>

      <AddPatientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSavePatient} 
      />

      {view === 'grid' ? (
        <div className={styles.grid}>
          {filteredPatients.map(p => (
            <div key={p.id} className={`${styles.card} glass`}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  {p.name.charAt(0)}
                </div>
                <button className={styles.moreBtn}><MoreVertical size={18} /></button>
              </div>
              <div className={styles.cardBody}>
                <h3>{p.name}</h3>
                <p>{p.age} years • {p.gender}</p>
                <div className={styles.conditionTag}>{p.condition}</div>
              </div>
              <div className={styles.cardFooter}>
                <span className={`${styles.status} ${styles[p.status.toLowerCase().replace(' ', '')]}`}>
                  {p.status}
                </span>
                <span className={styles.date}>Last: {p.lastVisit}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`${styles.listContainer} glass`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age / Gender</th>
                <th>Condition</th>
                <th>Status</th>
                <th>Last Visit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className={styles.tableName}>
                      <div className={styles.smallAvatar}>{p.name.charAt(0)}</div>
                      {p.name}
                    </div>
                  </td>
                  <td>{p.age} / {p.gender}</td>
                  <td>{p.condition}</td>
                  <td>
                    <span className={`${styles.status} ${styles[p.status.toLowerCase().replace(' ', '')]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{p.lastVisit}</td>
                  <td><button className={styles.moreBtn}><MoreVertical size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Patients;
