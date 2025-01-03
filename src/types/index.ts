export interface Company {
  id: string;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phones: string[];
  comments: string;
  communicationPeriodicity: number; // in days
  lastCommunication?: Date;
  nextCommunication?: Date;
}

export interface CommunicationMethod {
  id: string;
  name: string;
  description: string;
  sequence: number;
  isMandatory: boolean;
}

export interface Communication {
  id: string;
  companyId: string;
  methodId: string;
  date: Date;
  notes: string;
  status: 'completed' | 'scheduled' | 'overdue';
}