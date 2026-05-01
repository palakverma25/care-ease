import React, { useState } from 'react';
import styles from '../pages/Patients.module.css';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: any) => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'Female',
    condition: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newPatient);
    setNewPatient({ name: '', age: '', gender: 'Female', condition: '' });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} glass`}>
        <h3>Add New Patient</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe"
              value={newPatient.name}
              onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
              required 
            />
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Age</label>
              <input 
                type="number" 
                placeholder="35"
                value={newPatient.age}
                onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Gender</label>
              <select 
                value={newPatient.gender}
                onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Condition</label>
            <input 
              type="text" 
              placeholder="e.g. Hypertension"
              value={newPatient.condition}
              onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
              required 
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.saveBtn}>Save Patient</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
