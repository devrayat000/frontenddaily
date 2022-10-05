import create from "zustand";

export type FrameworkStore = {
  framework: string;
  search: string;
};

export const useFilterStore = create<FrameworkStore>((set) => ({
  framework: "all",
  search: "",
}));
