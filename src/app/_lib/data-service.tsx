import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { Component } from "../_ts/app-interfaces";
import { supabase } from "./supabase";
import ImageShowcase from "@/app/_components/ImageShowcase";

type ComponentCategoryQuery = {
  category_name: string;
};

type getComponentsProps = {
  hasString?: string;
};

const componentPreviews: Array<{ name: string; preview: JSX.Element }> = [
  { name: "image-showcase", preview: <ImageShowcase components={[]} /> },
  { name: "tabs", preview: <></> },
  { name: "burger-menu", preview: <></> },
];

export const getComponents = async (
  options: getComponentsProps = {}
): Promise<Component[] | null> => {
  let query = supabase.from("components").select();

  if (options?.hasString) query = query.ilike("name", `%${options.hasString}%`);

  const {
    data,
    error,
  }: { data: Component[] | null; error: PostgrestError | null } = await query;

  if (error) throw new Error(error.message);

  return data;
};

export const getComponentCategories = async (): Promise<string[] | null> => {
  const {
    data,
    error,
  }: { data: ComponentCategoryQuery[] | null; error: PostgrestError | null } =
    await supabase
      .from("component_categories")
      .select("category_name")
      .order("category_name");

  if (error) throw new Error(error.message);

  const finalData = data?.map((obj) => obj?.category_name);

  return finalData ?? null;
};

export const getComponent = async (
  componentId: number
): Promise<Component | null> => {
  const { data, error }: PostgrestSingleResponse<Component> = await supabase
    .from("components")
    .select()
    .eq("id", componentId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const getComponentPreview = (name: string): JSX.Element => {
  const [preview] = componentPreviews.filter(
    (componentPreview) => componentPreview.name === name
  );

  return preview?.preview;
};
