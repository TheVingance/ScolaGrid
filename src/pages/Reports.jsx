import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Download, FileImage, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const SHIFT_TIMES = {
  'Manhã': ['07:10', '08:00', '08:50', '10:00', '10:50', '11:40'],
  'Tarde': ['13:30', '14:20', '15:10', '16:00', '16:50', '17:40']
};

const Reports = () => {
  const { data } = useStore();
  const [selectedClassId, setSelectedClassId] = useState('');
  const printRef = useRef(null);

  const selectedClass = data.classes.find(c => c.id === selectedClassId);
  const times = selectedClass ? SHIFT_TIMES[selectedClass.shift] : [];

  const getSlot = (day, time) => {
    return data.schedules.find(s => 
      s.classId === selectedClassId && s.dayOfWeek === day && s.timeSlot === time
    ) || {};
  };

  const handleExportPNG = async () => {
    if (!printRef.current) return;
    try {
      const canvas = await html2canvas(printRef.current, { backgroundColor: '#0F172A', scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `grade_${selectedClass.name}.png`;
      link.click();
    } catch (err) {
      console.error("Erro ao exportar PNG", err);
    }
  };

  const handleExportPDF = async () => {
    if (!printRef.current) return;
    try {
      const canvas = await html2canvas(printRef.current, { backgroundColor: '#0F172A', scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`grade_${selectedClass.name}.pdf`);
    } catch (err) {
      console.error("Erro ao exportar PDF", err);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1>Relatórios e Exportação</h1>
      
      <div className="glass-panel card mb-4">
        <div className="form-group" style={{ margin: 0, maxWidth: '400px' }}>
          <label>Selecione a Turma para Exportar</label>
          <select 
            className="form-control"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
          >
            <option value="">-- Selecione --</option>
            {data.classes.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.shift})</option>
            ))}
          </select>
        </div>
      </div>

      {selectedClassId && (
        <>
          <div className="flex gap-4 mb-4">
            <button onClick={handleExportPNG} className="btn btn-primary">
              <FileImage size={18} /> Exportar como Imagem (PNG)
            </button>
            <button onClick={handleExportPDF} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #EF4444, #B91C1C)' }}>
              <FileText size={18} /> Exportar como PDF
            </button>
          </div>

          <div className="glass-panel card">
            <div ref={printRef} style={{ padding: '20px', background: 'var(--color-bg)' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
                Grade Escolar - {selectedClass.name}
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', border: '1px solid #334155' }}>
                <thead>
                  <tr style={{ background: '#1E293B' }}>
                    <th style={{ border: '1px solid #334155', padding: '12px' }}>Horário</th>
                    {DAYS.map(day => <th key={day} style={{ border: '1px solid #334155', padding: '12px', textAlign: 'center' }}>{day}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {times.map(time => (
                    <tr key={time}>
                      <td style={{ border: '1px solid #334155', padding: '12px', fontWeight: 'bold', background: '#1E293B' }}>{time}</td>
                      {DAYS.map(day => {
                        const slot = getSlot(day, time);
                        const subject = data.subjects.find(s => s.id === slot.subjectId);
                        const teacher = data.teachers.find(t => t.id === slot.teacherId);
                        
                        return (
                          <td key={`${day}-${time}`} style={{ border: '1px solid #334155', padding: '12px', textAlign: 'center' }}>
                            {subject ? (
                              <div>
                                <strong style={{ display: 'block', color: '#818CF8' }}>{subject.name}</strong>
                                <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{teacher?.name}</span>
                              </div>
                            ) : (
                              <span style={{ color: '#475569' }}>-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
