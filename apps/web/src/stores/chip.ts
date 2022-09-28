import create from "zustand";

export type TagStore = {
  tags: Set<string>;
  add(item: string): void;
  remove(item: string): void;
  clear(): void;
};
export const useTagStore = create<TagStore>((set) => ({
  tags: new Set<string>(),
  add(item: string) {
    set((prev) => ({
      ...prev,
      tags: prev.tags.add(item),
    }));
  },
  remove(item: string) {
    set((prev) => {
      prev.tags.delete(item);
      return { ...prev, tags: prev.tags };
    });
  },
  clear() {
    set((prev) => ({ ...prev, tags: new Set() }));
  },
}));
