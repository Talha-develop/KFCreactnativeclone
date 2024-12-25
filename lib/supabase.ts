import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://vkdjoxltvsqugcrqisit.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZGpveGx0dnNxdWdjcnFpc2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MTU5NjYsImV4cCI6MjA0OTk5MTk2Nn0.s-8U9jWnaiQX8JzIxEljyidiC3fU-l4ECWtzks1GVcQ';
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

