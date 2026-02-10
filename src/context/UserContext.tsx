"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Child {
  name?: string;
  ageGroup: "3-4" | "5-7" | "Other";
  customAge?: number;
}

export interface UserState {
  isLoggedIn: boolean;
  children: Child[];
  preferredMoment: "Bedtime" | "Morning" | "Car ride" | "Dinner" | "Weekend";
  emailRemindersEnabled: boolean;
  reminderFrequency: "couple_per_week" | "weekly" | "none";
  onboardingCompleted: boolean;
}

interface UserContextValue {
  user: UserState;
  setUser: (update: Partial<UserState>) => void;
}

const defaultUser: UserState = {
  isLoggedIn: false,
  children: [{ ageGroup: "5-7" }],
  preferredMoment: "Bedtime",
  emailRemindersEnabled: true,
  reminderFrequency: "couple_per_week",
  onboardingCompleted: false,
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
