import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://rrkptbxqypzicmejfyda.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJya3B0YnhxeXB6aWNtZWpmeWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMjUyNDEsImV4cCI6MjA3NjYwMTI0MX0.lqHRG7JqGe0zE2hht_oFLHDymgj8MZk4IvSD0IHT1FM"
export const supabase = createClient(supabaseUrl, supabaseKey)
