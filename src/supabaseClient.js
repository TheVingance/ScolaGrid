import { createClient } from '@supabase/supabase-js';

// As chaves devem ser colocadas no arquivo .env.local na raiz do projeto:
// VITE_SUPABASE_URL=https://sua-url.supabase.co
// VITE_SUPABASE_ANON_KEY=sua-anon-key

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
