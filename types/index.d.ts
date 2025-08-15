export interface ContactType {
  id: string;
  name: string;
  image: string;
  phone: string;
};

export interface ScheduleType {
  id: string;
  contact: ContactType;
  date: string;
  time: string;
};

export interface NotificationType {
  id: string;
  name: string;
  image: string;
  phone: string;
  date: string;
  time: string;
};
