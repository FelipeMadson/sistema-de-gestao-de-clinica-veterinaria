
import { Tutor, Pet, Veterinarian, Appointment, MedicalRecord, VaccineRecord } from './types.js';

export class VetClinicManager {
  private tutors = new Map<string, Tutor>();
  private pets = new Map<string, Pet>();
  private vets = new Map<string, Veterinarian>();
  private appointments = new Map<string, Appointment>();
  private medicalRecords: MedicalRecord[] = [];
  private vaccineRecords: VaccineRecord[] = [];

  public registerTutor(tutor: Tutor): void {
    if (!tutor.name || !tutor.phone) throw new Error('Tutor name and phone are required');
    this.tutors.set(tutor.id, tutor);
  }

  public registerPet(pet: Pet): void {
    if (!this.tutors.has(pet.tutorId)) throw new Error('Tutor not found');
    if (pet.weightKg <= 0) throw new Error('Weight must be positive');
    this.pets.set(pet.id, pet);
  }

  public registerVet(vet: Veterinarian): void {
    if (!vet.crmv) throw new Error('CRMV is required');
    this.vets.set(vet.id, vet);
  }

  public scheduleAppointment(apt: Appointment): void {
    if (!this.pets.has(apt.petId)) throw new Error('Pet not registered');
    if (!this.vets.has(apt.veterinarianId)) throw new Error('Veterinarian not registered');
    if (apt.startTime >= apt.endTime) throw new Error('Start time must be before end time');

    for (const existing of this.appointments.values()) {
      if (existing.status === 'cancelled') continue;
      if (existing.veterinarianId === apt.veterinarianId) {
        const hasOverlap = apt.startTime < existing.endTime && apt.endTime > existing.startTime;
        if (hasOverlap) throw new Error('Veterinarian schedule conflict');
      }
      if (existing.petId === apt.petId) {
        const hasOverlap = apt.startTime < existing.endTime && apt.endTime > existing.startTime;
        if (hasOverlap) throw new Error('Pet already has appointment in this timeframe');
      }
    }

    this.appointments.set(apt.id, apt);
  }

  public addMedicalRecord(rec: MedicalRecord): void {
    if (!this.pets.has(rec.petId)) throw new Error('Pet not found');
    this.medicalRecords.push(rec);
  }

  public recordVaccine(v: VaccineRecord): void {
    if (!this.pets.has(v.petId)) throw new Error('Pet not found');
    if (v.expiresAt <= v.administeredAt) throw new Error('Expiration must be after administration');
    this.vaccineRecords.push(v);
  }

  public getOverdueVaccines(currentDate: Date): VaccineRecord[] {
    return this.vaccineRecords.filter(v => v.expiresAt < currentDate);
  }

  public getPetHistory(petId: string): { records: MedicalRecord[]; vaccines: VaccineRecord[] } {
    return {
      records: this.medicalRecords.filter(r => r.petId === petId),
      vaccines: this.vaccineRecords.filter(v => v.petId === petId)
    };
  }

  public getTutorPets(tutorId: string): Pet[] {
    return Array.from(this.pets.values()).filter(p => p.tutorId === tutorId);
  }
}
