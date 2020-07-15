import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

/**
 * This class will check, create and save an appointment in the database
 */

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // Check if there is another appointment in the same date
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Trow an error if there is another appointment in the same date
    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked');

    // Create appointment
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Save appointment in the database
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
