import { create } from 'zustand'

export interface ConfigPreference {
  stayInTabOnSave: boolean
}

interface PreferenceState {
  userPreference: ConfigPreference
  setUserPreference: (userPreference: ConfigPreference) => void
}

export const userPreferenceState = create<PreferenceState>((set) => ({
  userPreference: {} as ConfigPreference,
  setUserPreference: (userPreference: ConfigPreference) =>
    set(() => ({
      userPreference: userPreference,
    })),
}))
