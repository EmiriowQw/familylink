export type Mood = 'joy' | 'calm' | 'tired' | 'stress' | 'anger';

export type Role = 'parent' | 'child';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  mood: Mood;
  comment?: string;
  date: string;
}

export interface FamilyMember {
  user: User;
  currentMood?: Mood;
  currentComment?: string;
  lastCheckIn?: string;
}

export interface Family {
  id: string;
  code: string;
  members: FamilyMember[];
}

// Моковые данные
export const mockUsers: User[] = [
  { id: '1', name: 'Мама', role: 'parent' },
  { id: '2', name: 'Папа', role: 'parent' },
  { id: '3', name: 'Саша', role: 'child' },
  { id: '4', name: 'Маша', role: 'child' },
];

export const mockCheckIns: CheckIn[] = [
  // Сегодня
  { id: '1', userId: '1', mood: 'calm', comment: 'Всё хорошо', date: new Date().toISOString() },
  { id: '2', userId: '2', mood: 'stress', comment: 'Много работы', date: new Date().toISOString() },
  { id: '3', userId: '3', mood: 'tired', comment: 'Много домашки', date: new Date().toISOString() },
  { id: '4', userId: '4', mood: 'joy', date: new Date().toISOString() },
  
  // Вчера
  { id: '5', userId: '1', mood: 'joy', date: new Date(Date.now() - 86400000).toISOString() },
  { id: '6', userId: '2', mood: 'calm', date: new Date(Date.now() - 86400000).toISOString() },
  { id: '7', userId: '3', mood: 'stress', comment: 'Контрольная', date: new Date(Date.now() - 86400000).toISOString() },
  { id: '8', userId: '4', mood: 'joy', date: new Date(Date.now() - 86400000).toISOString() },
  
  // 2 дня назад
  { id: '9', userId: '1', mood: 'calm', date: new Date(Date.now() - 172800000).toISOString() },
  { id: '10', userId: '2', mood: 'calm', date: new Date(Date.now() - 172800000).toISOString() },
  { id: '11', userId: '3', mood: 'joy', date: new Date(Date.now() - 172800000).toISOString() },
  { id: '12', userId: '4', mood: 'calm', date: new Date(Date.now() - 172800000).toISOString() },
  
  // 3 дня назад
  { id: '13', userId: '1', mood: 'tired', date: new Date(Date.now() - 259200000).toISOString() },
  { id: '14', userId: '2', mood: 'stress', date: new Date(Date.now() - 259200000).toISOString() },
  { id: '15', userId: '3', mood: 'anger', comment: 'Конфликт с другом', date: new Date(Date.now() - 259200000).toISOString() },
  { id: '16', userId: '4', mood: 'calm', date: new Date(Date.now() - 259200000).toISOString() },
  
  // 4 дня назад
  { id: '17', userId: '1', mood: 'joy', date: new Date(Date.now() - 345600000).toISOString() },
  { id: '18', userId: '2', mood: 'joy', date: new Date(Date.now() - 345600000).toISOString() },
  { id: '19', userId: '3', mood: 'calm', date: new Date(Date.now() - 345600000).toISOString() },
  { id: '20', userId: '4', mood: 'joy', date: new Date(Date.now() - 345600000).toISOString() },
  
  // 5 дней назад
  { id: '21', userId: '1', mood: 'calm', date: new Date(Date.now() - 432000000).toISOString() },
  { id: '22', userId: '2', mood: 'calm', date: new Date(Date.now() - 432000000).toISOString() },
  { id: '23', userId: '3', mood: 'tired', date: new Date(Date.now() - 432000000).toISOString() },
  { id: '24', userId: '4', mood: 'calm', date: new Date(Date.now() - 432000000).toISOString() },
  
  // 6 дней назад
  { id: '25', userId: '1', mood: 'stress', date: new Date(Date.now() - 518400000).toISOString() },
  { id: '26', userId: '2', mood: 'calm', date: new Date(Date.now() - 518400000).toISOString() },
  { id: '27', userId: '3', mood: 'joy', date: new Date(Date.now() - 518400000).toISOString() },
  { id: '28', userId: '4', mood: 'joy', date: new Date(Date.now() - 518400000).toISOString() },
];

export const mockFamily: Family = {
  id: 'family-1',
  code: '123456',
  members: [
    {
      user: mockUsers[0],
      currentMood: 'calm',
      currentComment: 'Всё хорошо',
      lastCheckIn: new Date().toISOString(),
    },
    {
      user: mockUsers[1],
      currentMood: 'stress',
      currentComment: 'Много работы',
      lastCheckIn: new Date().toISOString(),
    },
    {
      user: mockUsers[2],
      currentMood: 'tired',
      currentComment: 'Много домашки',
      lastCheckIn: new Date().toISOString(),
    },
    {
      user: mockUsers[3],
      currentMood: 'joy',
      lastCheckIn: new Date().toISOString(),
    },
  ],
};
