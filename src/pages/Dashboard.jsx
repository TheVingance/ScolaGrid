import React from 'react';
import { useStore } from '../context/StoreContext';
import { BookOpen, Users, GraduationCap, CalendarDays } from 'lucide-react';

const Dashboard = () => {
  const { data } = useStore();

  const stats = [
    { label: 'Total de Disciplinas', value: data.subjects.length, icon: <BookOpen size={24} />, color: 'var(--color-primary)' },
    { label: 'Total de Professores', value: data.teachers.length, icon: <Users size={24} />, color: 'var(--color-secondary)' },
    { label: 'Total de Turmas', value: data.classes.length, icon: <GraduationCap size={24} />, color: 'var(--color-success)' },
    { label: 'Aulas na Grade', value: data.schedules.length, icon: <CalendarDays size={24} />, color: 'var(--color-warning)' },
  ];

  return (
    <div className="animate-fade-in">
      <h1>Dashboard</h1>
      <p className="mb-4">Visão geral do sistema de horários escolares.</p>

      <div className="grid grid-cols-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-panel card flex items-center gap-4">
            <div 
              style={{ background: `${stat.color}20`, color: stat.color, padding: '1rem', borderRadius: '12px' }}
            >
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{stat.label}</p>
              <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 mt-4">
        <div className="glass-panel card">
          <h2>Bem-vindo ao ScolaGrid</h2>
          <p>
            O ScolaGrid é um sistema moderno para gerenciar os horários das suas turmas de forma simples e eficiente.
            Navegue pelo menu lateral para cadastrar Disciplinas, Professores e Turmas. Em seguida, utilize o Gerenciador 
            de Grade para montar os horários e evitar conflitos.
          </p>
          <br/>
          <p>Você pode exportar as grades como imagem ou documento PDF.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
