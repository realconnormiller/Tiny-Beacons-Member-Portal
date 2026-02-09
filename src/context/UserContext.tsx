"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Child {
  name: string;
  ageGroup: string;
}

export interface UserState {
  children: Child[];
  preferredMoment: string;
  emailReminders: boolean;
  reminderFrequency: string;
  onboardingComplete: boolean;
}

interface UserContextValue {
  user: UserState;
  setUser: (update: Partial<UserState>) => void;
}

const defaultUser: UserState = {
  children: [{ name: "", ageGroup: "5–7" }],
  preferredMoment: "Bedtime",
  emailReminders: true,
  reminderFrequency: "2x per week",
  onboardingComplete: false,
};

const UserContext = createContext<UserContextValue>({
  user: defaultUser,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserState>(defaultUser);

  function setUser(update: Partial<UserState>) {
    setUserState((prev) => ({ ...prev, ...update }));
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
