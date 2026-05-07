import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, GraduationCap, CalendarDays, FileOutput } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/subjects', icon: <BookOpen size={20} />, label: 'Disciplinas' },
    { path: '/teachers', icon: <Users size={20} />, label: 'Professores' },
    { path: '/classes', icon: <GraduationCap size={20} />, label: 'Turmas' },
    { path: '/schedule', icon: <CalendarDays size={20} />, label: 'Grade Escolar' },
    { path: '/reports', icon: <FileOutput size={20} />, label: 'Relatórios / Exportar' }
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-icon">
          <CalendarDays size={28} />
        </div>
        <h2>ScolaGrid</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
