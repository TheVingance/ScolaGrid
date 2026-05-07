import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Subjects = () => {
  const { data, addItem, updateItem, deleteItem } = useStore();
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', workload: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.workload) return;

    if (isEditing) {
      updateItem('subjects', { ...formData, id: isEditing });
      setIsEditing(null);
    } else {
      addItem('subjects', formData);
    }
    setFormData({ name: '', workload: '' });
  };

  const handleEdit = (subject) => {
    setFormData({ name: subject.name, workload: subject.workload });
    setIsEditing(subject.id);
  };

  return (
    <div className="animate-fade-in">
      <h1>Disciplinas</h1>
      
      <div className="grid grid-cols-3">
        <div className="glass-panel card">
          <h2>{isEditing ? 'Editar Disciplina' : 'Nova Disciplina'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome da Disciplina</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Ex: Matemática" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Carga Horária Semanal (aulas)</label>
              <input 
                type="number" 
                className="form-control"
                placeholder="Ex: 4" 
                min="1"
                value={formData.workload}
                onChange={(e) => setFormData({...formData, workload: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">
                <Plus size={16} /> {isEditing ? 'Atualizar' : 'Adicionar'}
              </button>
              {isEditing && (
                <button type="button" className="btn btn-secondary" onClick={() => { setIsEditing(null); setFormData({name:'', workload:''}); }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="glass-panel card" style={{ gridColumn: 'span 2' }}>
          <h2>Lista de Disciplinas</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Carga Horária</th>
                  <th style={{ width: '120px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.subjects.length === 0 ? (
                  <tr><td colSpan="3" style={{ textAlign: 'center' }}>Nenhuma disciplina cadastrada.</td></tr>
                ) : (
                  data.subjects.map(subject => (
                    <tr key={subject.id}>
                      <td>{subject.name}</td>
                      <td>{subject.workload} aulas/sem</td>
                      <td>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(subject)} className="btn btn-secondary" style={{ padding: '0.4rem' }}>
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteItem('subjects', subject.id)} className="btn btn-danger" style={{ padding: '0.4rem' }}>
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

export default Subjects;
