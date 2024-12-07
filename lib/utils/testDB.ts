import { supabase } from "@/lib/supabase";

const testConnection = async () => {
  const { data, error } = await supabase.rpc("current_user_role");
};
