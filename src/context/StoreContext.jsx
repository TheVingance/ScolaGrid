import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabaseClient';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [data, setData] = useState({
    subjects: [],
    teachers: [],
    classes: [],
    schedules: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setError("Variáveis de ambiente do Supabase não configuradas no .env.local.");
      setLoading(false);
      return;
    }

    try {
      const [subsRes, teachRes, classRes, schedRes] = await Promise.all([
        supabase.from('subjects').select('*'),
        supabase.from('teachers').select('*'),
        supabase.from('classes').select('*'),
        supabase.from('schedules').select('*')
      ]);

      if (subsRes.error) throw subsRes.error;
      if (teachRes.error) throw teachRes.error;
      if (classRes.error) throw classRes.error;
      if (schedRes.error) throw schedRes.error;

      setData({
        subjects: subsRes.data || [],
        teachers: teachRes.data || [],
        classes: classRes.data || [],
        schedules: schedRes.data || []
      });
    } catch (err) {
      console.error("Erro ao buscar dados do Supabase:", err);
      setError("Falha ao conectar no banco de dados. Verifique suas credenciais e se rodou o script SQL.");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (collection, item) => {
    const newItem = { ...item, id: uuidv4() };
    
    // Update local state immediately for fast UI
    setData(prev => ({
      ...prev,
      [collection]: [...prev[collection], newItem]
    }));

    if (isSupabaseConfigured) {
      const { error } = await supabase.from(collection).insert([newItem]);
      if (error) console.error(`Erro ao inserir em ${collection}:`, error);
    }
  };

  const updateItem = async (collection, updatedItem) => {
    setData(prev => ({
      ...prev,
      [collection]: prev[collection].map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    }));

    if (isSupabaseConfigured) {
      const { error } = await supabase.from(collection).update(updatedItem).eq('id', updatedItem.id);
      if (error) console.error(`Erro ao atualizar ${collection}:`, error);
    }
  };

  const deleteItem = async (collection, id) => {
    setData(prev => ({
      ...prev,
      [collection]: prev[collection].filter(item => item.id !== id)
    }));

    if (isSupabaseConfigured) {
      const { error } = await supabase.from(collection).delete().eq('id', id);
      if (error) console.error(`Erro ao deletar de ${collection}:`, error);
    }
  };

  const saveScheduleSlot = async (classId, dayOfWeek, timeSlot, teacherId, subjectId) => {
    const slotId = uuidv4();

    setData(prev => {
      const filteredSchedules = prev.schedules.filter(s => 
        !(s.classId === classId && s.dayOfWeek === dayOfWeek && s.timeSlot === timeSlot)
      );

      if (!teacherId || !subjectId) {
        return { ...prev, schedules: filteredSchedules };
      }

      return {
        ...prev,
        schedules: [
          ...filteredSchedules,
          { id: slotId, classId, teacherId, subjectId, dayOfWeek, timeSlot }
        ]
      };
    });

    if (isSupabaseConfigured) {
      // Delete old if exists
      await supabase.from('schedules')
        .delete()
        .match({ classId, dayOfWeek, timeSlot });

      if (teacherId && subjectId) {
        // Insert new
        const { error } = await supabase.from('schedules').insert([{
          id: slotId, classId, teacherId, subjectId, dayOfWeek, timeSlot
        }]);
        if (error) console.error('Erro ao salvar horário:', error);
      }
    }
  };

  const isTeacherBusy = (teacherId, dayOfWeek, timeSlot, currentClassId) => {
    return data.schedules.some(s => 
      s.teacherId === teacherId && 
      s.dayOfWeek === dayOfWeek && 
      s.timeSlot === timeSlot &&
      s.classId !== currentClassId
    );
  };

  return (
    <StoreContext.Provider value={{
      data,
      loading,
      error,
      addItem,
      updateItem,
      deleteItem,
      saveScheduleSlot,
      isTeacherBusy
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
