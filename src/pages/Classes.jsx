import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Classes = () => {
  const { data, addItem, updateItem, deleteItem } = useStore();
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', shift: 'Manhã' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (isEditing) {
      updateItem('classes', { ...formData, id: isEditing });
      setIsEditing(null);
    } else {
      addItem('classes', formData);
    }
    setFormData({ name: '', shift: 'Manhã' });
  };

  const handleEdit = (cls) => {
    setFormData({ name: cls.name, shift: cls.shift });
    setIsEditing(cls.id);
  };

  return (
    <div className="animate-fade-in">
      <h1>Turmas</h1>
      
      <div className="grid grid-cols-3">
        <div className="glass-panel card">
          <h2>{isEditing ? 'Editar Turma' : 'Nova Turma'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome da Turma</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Ex: 1º Ano A" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Turno</label>
              <select 
                className="form-control"
                value={formData.shift}
                onChange={(e) => setFormData({...formData, shift: e.target.value})}
              >
                <option value="Manhã">Manhã (07:10 - 12:30)</option>
                <option value="Tarde">Tarde (13:30 - 18:20)</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">
                <Plus size={16} /> {isEditing ? 'Atualizar' : 'Adicionar'}
              </button>
              {isEditing && (
                <button type="button" className="btn btn-secondary" onClick={() => { setIsEditing(null); setFormData({name:'', shift:'Manhã'}); }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="glass-panel card" style={{ gridColumn: 'span 2' }}>
          <h2>Lista de Turmas</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Turma</th>
                  <th>Turno</th>
                  <th style={{ width: '120px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.classes.length === 0 ? (
                  <tr><td colSpan="3" style={{ textAlign: 'center' }}>Nenhuma turma cadastrada.</td></tr>
                ) : (
                  data.classes.map(cls => (
                    <tr key={cls.id}>
                      <td>{cls.name}</td>
                      <td><span className="badge">{cls.shift}</span></td>
                      <td>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(cls)} className="btn btn-secondary" style={{ padding: '0.4rem' }}>
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteItem('classes', cls.id)} className="btn btn-danger" style={{ padding: '0.4rem' }}>
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

export default Classes;
