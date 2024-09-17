import { PostgrestError } from "@supabase/supabase-js";
import { Component } from "../_ts/app-interfaces";
import { supabase } from "./supabase";

export const getComponents = async (): Promise<Component[] | null> => {
  const {
    data,
    error,
  }: { data: Component[] | null; error: PostgrestError | null } = await supabase
    .from("components")
    .select("id, created_at, name, description, image, code_tsx, code_jsx");

  if (error) throw new Error(error.message);

  return data;
};
