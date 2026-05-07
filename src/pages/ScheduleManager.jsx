import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AlertCircle } from 'lucide-react';

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const SHIFT_TIMES = {
  'Manhã': ['07:10', '08:00', '08:50', '10:00', '10:50', '11:40'],
  'Tarde': ['13:30', '14:20', '15:10', '16:00', '16:50', '17:40']
};

const ScheduleManager = () => {
  const { data, error, saveScheduleSlot, isTeacherBusy } = useStore();
  const [selectedClassId, setSelectedClassId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const selectedClass = data.classes.find(c => c.id === selectedClassId);
  const times = selectedClass ? SHIFT_TIMES[selectedClass.shift] : [];

  const handleCellChange = (day, time, subjectId, teacherId) => {
    setErrorMsg('');
    
    // Validate if teacher is busy
    if (teacherId && isTeacherBusy(teacherId, day, time, selectedClassId)) {
      setErrorMsg(`Conflito: O professor selecionado já possui aula na ${day} às ${time} em outra turma.`);
      return;
    }

    saveScheduleSlot(selectedClassId, day, time, teacherId, subjectId);
  };

  const getSlot = (day, time) => {
    return data.schedules.find(s => 
      s.classId === selectedClassId && s.dayOfWeek === day && s.timeSlot === time
    ) || {};
  };

  return (
    <div className="animate-fade-in">
      <h1>Gerenciador de Grade</h1>

      {error && (
        <div className="card mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-danger)', borderRadius: '8px', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}
      
      <div className="glass-panel card mb-4">
        <div className="form-group" style={{ margin: 0, maxWidth: '400px' }}>
          <label>Selecione a Turma</label>
          <select 
            className="form-control"
            value={selectedClassId}
            onChange={(e) => { setSelectedClassId(e.target.value); setErrorMsg(''); }}
          >
            <option value="">-- Selecione --</option>
            {data.classes.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.shift})</option>
            ))}
          </select>
        </div>
      </div>

      {errorMsg && (
        <div className="card mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-danger)', borderRadius: '8px', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          {errorMsg}
        </div>
      )}

      {selectedClassId ? (
        <div className="glass-panel card">
          <h2>Grade Escolar: {selectedClass?.name}</h2>
          <div className="table-container" style={{ overflow: 'visible' }}>
            <table style={{ minWidth: '800px' }}>
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Horário</th>
                  {DAYS.map(day => <th key={day}>{day}</th>)}
                </tr>
              </thead>
              <tbody>
                {times.map(time => (
                  <tr key={time}>
                    <td style={{ fontWeight: 'bold', color: 'var(--color-text-muted)' }}>{time}</td>
                    {DAYS.map(day => {
                      const slot = getSlot(day, time);
                      return (
                        <td key={`${day}-${time}`} style={{ verticalAlign: 'top', padding: '0.5rem' }}>
                          <SlotEditor 
                            day={day} 
                            time={time} 
                            slot={slot} 
                            onChange={(subId, teachId) => handleCellChange(day, time, subId, teachId)} 
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel card flex items-center justify-center" style={{ height: '200px', color: 'var(--color-text-muted)' }}>
          Selecione uma turma para visualizar a grade.
        </div>
      )}
    </div>
  );
};

// Component for individual cell editing
const SlotEditor = ({ day, time, slot, onChange }) => {
  const { data } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [subId, setSubId] = useState(slot.subjectId || '');
  const [teachId, setTeachId] = useState(slot.teacherId || '');

  // Update local state if prop changes
  React.useEffect(() => {
    setSubId(slot.subjectId || '');
    setTeachId(slot.teacherId || '');
  }, [slot]);

  // Available teachers for the selected subject
  const availableTeachers = data.teachers.filter(t => !subId || t.subjectIds.includes(subId));

  const handleSave = () => {
    onChange(subId, teachId);
    setIsEditing(false);
  };

  const handleClear = () => {
    onChange('', '');
    setIsEditing(false);
  };

  if (!isEditing && (slot.subjectId || slot.teacherId)) {
    const subject = data.subjects.find(s => s.id === slot.subjectId);
    const teacher = data.teachers.find(t => t.id === slot.teacherId);
    return (
      <div 
        onClick={() => setIsEditing(true)}
        style={{
          background: 'rgba(79, 70, 229, 0.1)',
          border: '1px solid rgba(79, 70, 229, 0.3)',
          borderRadius: '6px',
          padding: '0.5rem',
          cursor: 'pointer',
          minHeight: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
      >
        <div style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-primary)' }}>{subject?.name || '---'}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{teacher?.name || '---'}</div>
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div 
        onClick={() => setIsEditing(true)}
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px dashed var(--color-border)',
          borderRadius: '6px',
          height: '60px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-muted)',
          fontSize: '0.8rem'
        }}
      >
        + Add
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-primary)',
      borderRadius: '6px',
      padding: '0.5rem',
      position: 'relative',
      zIndex: 10
    }}>
      <select 
        value={subId}
        onChange={(e) => { setSubId(e.target.value); setTeachId(''); }}
        style={{ width: '100%', marginBottom: '4px', padding: '2px', fontSize: '0.8rem', borderRadius: '4px', background: 'var(--color-bg)', color: 'white', border: '1px solid var(--color-border)' }}
      >
        <option value="">Disciplina...</option>
        {data.subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <select 
        value={teachId}
        onChange={(e) => setTeachId(e.target.value)}
        disabled={!subId}
        style={{ width: '100%', marginBottom: '8px', padding: '2px', fontSize: '0.8rem', borderRadius: '4px', background: 'var(--color-bg)', color: 'white', border: '1px solid var(--color-border)' }}
      >
        <option value="">Professor...</option>
        {availableTeachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>

      <div className="flex gap-2 justify-between">
        <button onClick={handleSave} style={{ background: 'var(--color-success)', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Salvar</button>
        <button onClick={handleClear} style={{ background: 'var(--color-danger)', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Limpar</button>
      </div>
    </div>
  );
};

export default ScheduleManager;
