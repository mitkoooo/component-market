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
  {
    name: "image-showcase",
    preview: (
      <ImageShowcase
        images={[
          {
            src: "/yosemite.jpeg",
            alt: "Yosemite Valley",
            description:
              "Yosemite National Park is in California's Sierra Nevada mountains. It's famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome.",
          },
          {
            src: "/monument-valley.jpeg",
            alt: "Monument Valley",
            description:
              "Monument Valley, a red-sand desert region on the Arizona-Utah border, is known for the towering sandstone buttes of Monument Valley Navajo Tribal Park.",
          },
          {
            src: "/olympic-national-park.jpeg",
            alt: "Olympic National Park",
            description:
              "Olympic National Park is on Washington's Olympic Peninsula in the Pacific Northwest. The park sprawls across several different ecosystems, from the dramatic peaks of the Olympic Mountains to old-growth forests.",
          },
        ]}
      />
    ),
  },
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
