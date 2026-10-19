
export interface Tutor {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: Date;
}

export type Species = 'canine' | 'feline' | 'avian' | 'exotic';

export interface Pet {
  id: string;
  tutorId: string;
  name: string;
  species: Species;
  breed: string;
  birthDate: Date;
  weightKg: number;
}

export interface Veterinarian {
  id: string;
  name: string;
  crmv: string;
  specialty: string;
}

export interface Appointment {
  id: string;
  petId: string;
  veterinarianId: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  veterinarianId: string;
  timestamp: Date;
  diagnosis: string;
  treatment: string;
  prescriptions: string[];
}

export interface VaccineRecord {
  id: string;
  petId: string;
  vaccineName: string;
  administeredAt: Date;
  expiresAt: Date;
  batchNumber: string;
}
