import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Teachers = () => {
  const { data, addItem, updateItem, deleteItem } = useStore();
  const [isEditing, setIsEditing] = useState(null);
  
  // A teacher can teach multiple subjects
  const [formData, setFormData] = useState({ 
    name: '', 
    subjectIds: [] 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (isEditing) {
      updateItem('teachers', { ...formData, id: isEditing });
      setIsEditing(null);
    } else {
      addItem('teachers', formData);
    }
    setFormData({ name: '', subjectIds: [] });
  };

  const handleEdit = (teacher) => {
    setFormData({ name: teacher.name, subjectIds: teacher.subjectIds || [] });
    setIsEditing(teacher.id);
  };

  const toggleSubject = (subjectId) => {
    setFormData(prev => {
      const isSelected = prev.subjectIds.includes(subjectId);
      if (isSelected) {
        return { ...prev, subjectIds: prev.subjectIds.filter(id => id !== subjectId) };
      } else {
        return { ...prev, subjectIds: [...prev.subjectIds, subjectId] };
      }
    });
  };

  return (
    <div className="animate-fade-in">
      <h1>Professores</h1>
      
      <div className="grid grid-cols-3">
        <div className="glass-panel card">
          <h2>{isEditing ? 'Editar Professor' : 'Novo Professor'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Professor</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Ex: Prof. Carlos" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Disciplinas que leciona</label>
              <div style={{ maxHeight: '200px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px' }}>
                {data.subjects.length === 0 ? (
                  <p style={{ fontSize: '0.875rem' }}>Nenhuma disciplina cadastrada ainda.</p>
                ) : (
                  data.subjects.map(subject => (
                    <label key={subject.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: '0.5rem 0' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.subjectIds.includes(subject.id)}
                        onChange={() => toggleSubject(subject.id)}
                      />
                      {subject.name}
                    </label>
                  ))
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                <Plus size={16} /> {isEditing ? 'Atualizar' : 'Adicionar'}
              </button>
              {isEditing && (
                <button type="button" className="btn btn-secondary" onClick={() => { setIsEditing(null); setFormData({name:'', subjectIds:[]}); }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="glass-panel card" style={{ gridColumn: 'span 2' }}>
          <h2>Lista de Professores</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Disciplinas</th>
                  <th style={{ width: '120px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.teachers.length === 0 ? (
                  <tr><td colSpan="3" style={{ textAlign: 'center' }}>Nenhum professor cadastrado.</td></tr>
                ) : (
                  data.teachers.map(teacher => (
                    <tr key={teacher.id}>
                      <td>{teacher.name}</td>
                      <td>
                        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                          {teacher.subjectIds && teacher.subjectIds.map(subId => {
                            const sub = data.subjects.find(s => s.id === subId);
                            return sub ? <span key={subId} className="badge badge-primary">{sub.name}</span> : null;
                          })}
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(teacher)} className="btn btn-secondary" style={{ padding: '0.4rem' }}>
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteItem('teachers', teacher.id)} className="btn btn-danger" style={{ padding: '0.4rem' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
