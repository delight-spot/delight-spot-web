import { create } from 'zustand';

type ListSelectTab = 'all' | 'food' | 'cafe';

interface InitialState {
  selectedTab: ListSelectTab;
  setSelectedTab: (tab: ListSelectTab) => void;
}

const useStoreListTabState = create<InitialState>((set) => ({
  selectedTab: 'all',
  setSelectedTab: (selectedTab) => set({ selectedTab }),
}));

export { useStoreListTabState };
