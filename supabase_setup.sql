-- Execute este script no SQL Editor do seu Supabase para criar as tabelas necessárias

CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  workload TEXT
);

CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  subjectIds JSONB
);

CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  shift TEXT
);

CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY,
  classId UUID,
  teacherId UUID,
  subjectId UUID,
  dayOfWeek TEXT,
  timeSlot TEXT
);

-- Desabilitando RLS (Row Level Security) temporariamente para testes fáceis (não recomendado para produção)
ALTER TABLE subjects DISABLE ROW LEVEL SECURITY;
ALTER TABLE teachers DISABLE ROW LEVEL SECURITY;
ALTER TABLE classes DISABLE ROW LEVEL SECURITY;
ALTER TABLE schedules DISABLE ROW LEVEL SECURITY;
