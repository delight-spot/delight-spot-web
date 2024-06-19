import { create } from 'zustand';

interface LoginState {
  is_member?: boolean;
  token?: string;
  setLoginState: (state: { is_member?: boolean; token?: string }) => void;
}

const useLoginState = create<LoginState>((set) => ({
  is_member: undefined,
  token: undefined,
  setLoginState: (state) => set((prev) => ({ ...prev, ...state })),
}));

export { useLoginState };
