
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { VetClinicManager } from './service.js';

describe('VetClinicManager Suite', () => {
  test('should register tutor and pets accurately', () => {
    const clinic = new VetClinicManager();
    clinic.registerTutor({
      id: 'tut-1',
      name: 'Maria Silva',
      phone: '+55 11 98888-7777',
      email: 'maria@example.com',
      createdAt: new Date()
    });

    clinic.registerPet({
      id: 'pet-1',
      tutorId: 'tut-1',
      name: 'Thor',
      species: 'canine',
      breed: 'Golden Retriever',
      birthDate: new Date('2021-05-10'),
      weightKg: 32.5
    });

    const pets = clinic.getTutorPets('tut-1');
    assert.equal(pets.length, 1);
    assert.equal(pets[0].name, 'Thor');
    assert.equal(pets[0].weightKg, 32.5);
  });

  test('should prevent scheduling overlapping appointments for the same vet', () => {
    const clinic = new VetClinicManager();
    clinic.registerTutor({ id: 'tut-1', name: 'Maria Silva', phone: '11988887777', email: 'm@ex.com', createdAt: new Date() });
    clinic.registerPet({ id: 'pet-1', tutorId: 'tut-1', name: 'Thor', species: 'canine', breed: 'Golden', birthDate: new Date(), weightKg: 30 });
    clinic.registerPet({ id: 'pet-2', tutorId: 'tut-1', name: 'Mimi', species: 'feline', breed: 'Siamese', birthDate: new Date(), weightKg: 4 });
    clinic.registerVet({ id: 'vet-1', name: 'Dr. Roberto', crmv: 'SP-12345', specialty: 'General' });

    clinic.scheduleAppointment({
      id: 'apt-1',
      petId: 'pet-1',
      veterinarianId: 'vet-1',
      startTime: new Date('2026-10-20T10:00:00Z'),
      endTime: new Date('2026-10-20T11:00:00Z'),
      status: 'scheduled',
      reason: 'Routine checkup'
    });

    assert.throws(() => {
      clinic.scheduleAppointment({
        id: 'apt-2',
        petId: 'pet-2',
        veterinarianId: 'vet-1',
        startTime: new Date('2026-10-20T10:30:00Z'),
        endTime: new Date('2026-10-20T11:30:00Z'),
        status: 'scheduled',
        reason: 'Vaccination'
      });
    }, /schedule conflict/);
  });

  test('should accurately identify overdue vaccines', () => {
    const clinic = new VetClinicManager();
    clinic.registerTutor({ id: 'tut-1', name: 'Ana', phone: '11999999999', email: 'a@ex.com', createdAt: new Date() });
    clinic.registerPet({ id: 'pet-1', tutorId: 'tut-1', name: 'Rex', species: 'canine', breed: 'Beagle', birthDate: new Date(), weightKg: 12 });

    clinic.recordVaccine({
      id: 'vac-1',
      petId: 'pet-1',
      vaccineName: 'Rabies',
      administeredAt: new Date('2025-01-01'),
      expiresAt: new Date('2026-01-01'),
      batchNumber: 'RB-9981'
    });

    const overdue = clinic.getOverdueVaccines(new Date('2026-10-15'));
    assert.equal(overdue.length, 1);
    assert.equal(overdue[0].vaccineName, 'Rabies');
  });
});
