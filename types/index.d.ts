export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface ScheduleFormValues {
  contact: ContactType;
  date: string;
  time: string;
}

export interface ContactType {
  id: string;
  name: string;
  image: string;
  phone: string;
}

export interface ScheduleType {
  id: string;
  contact: ContactType;
  date: string;
  time: string;
}

export interface NotificationType {
  id: string;
  name: string;
  image?: string;
  phone: string;
  date: string;
  time: string;
}

export interface CallType {
  id: string;
  name: string;
  phone: string;
  type: CallStatus;
  time: Date;
}

export enum CallStatus {
  Missed = 'missed',
  Incoming = 'incomming',
  Outgoing = 'outgoing',
}
