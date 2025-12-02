import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Mood, CheckIn, Family, FamilyMember } from '../data/mockData';
import { mockCheckIns, mockFamily } from '../data/mockData';

interface MockDataContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  family: Family;
  setFamily: (family: Family) => void;
  checkIns: CheckIn[];
  addCheckIn: (mood: Mood, comment?: string) => void;
  getCheckInsByDate: (date: Date) => CheckIn[];
  getCheckInsByUser: (userId: string) => CheckIn[];
  getFamilyMember: (userId: string) => FamilyMember | undefined;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [family, setFamily] = useState<Family>(mockFamily);
  const [checkIns, setCheckIns] = useState<CheckIn[]>(mockCheckIns);

  const addCheckIn = (mood: Mood, comment?: string) => {
    if (!currentUser) return;

    const newCheckIn: CheckIn = {
      id: `checkin-${Date.now()}`,
      userId: currentUser.id,
      mood,
      comment,
      date: new Date().toISOString(),
    };

    setCheckIns([newCheckIn, ...checkIns]);

    // Обновляем текущее настроение члена семьи
    setFamily({
      ...family,
      members: family.members.map((member) =>
        member.user.id === currentUser.id
          ? {
              ...member,
              currentMood: mood,
              currentComment: comment,
              lastCheckIn: newCheckIn.date,
            }
          : member
      ),
    });
  };

  const getCheckInsByDate = (date: Date): CheckIn[] => {
    const dateStr = date.toISOString().split('T')[0];
    return checkIns.filter((checkIn) => checkIn.date.startsWith(dateStr));
  };

  const getCheckInsByUser = (userId: string): CheckIn[] => {
    return checkIns.filter((checkIn) => checkIn.userId === userId);
  };

  const getFamilyMember = (userId: string): FamilyMember | undefined => {
    return family.members.find((member) => member.user.id === userId);
  };

  return (
    <MockDataContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        family,
        setFamily,
        checkIns,
        addCheckIn,
        getCheckInsByDate,
        getCheckInsByUser,
        getFamilyMember,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within MockDataProvider');
  }
  return context;
};
