using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EasyVet.DAO
{
    public class Appointment : Generic.Base
    {
        public Appointment()
            : base()
        {

        }

        public Appointment(Interfaces.VetContext context)
            : base(context)
        {

        }

        public List<Models.Appointment> List()
        {
            var appointments = context.Appointments
                .Include(v => v.Veterinary)
                .Include(c => c.Costumer)
                .Include(a => a.Animal)
                .ToList();

            return appointments;
        }

        public bool Update(Models.Appointment appointment)
        {
            var appointmentFromBd = context.Appointments.FirstOrDefault(d => d.Id == appointment.Id);
            throwEntityNotFoundWhenNull(appointmentFromBd, appointment.Id);
            context.Entry(appointmentFromBd).CurrentValues.SetValues(appointment);
            context.Entry(appointmentFromBd).State = EntityState.Modified;
            context.SaveChanges();
            return true;
        }

        public Models.Appointment FindById(int id)
        {
            return this.context.Appointments
                .Include(a => a.Veterinary)
                .Include(a => a.Costumer)
                .Include(a => a.Animal)
                .FirstOrDefault(a => a.Id == id);
        }

        public Models.Appointment Insert(Models.Appointment appointment)
        {
            this.context.Appointments.Add(appointment);
            this.context.SaveChanges();
            return this.FindById(appointment.Id);
        }

        public bool Delete(int id)
        {
            return delete(this.context.Appointments, id);
        }

        public List<Models.Appointment> GetVeterinaryAppoitments(int id)
        {
            var appointments = context.Appointments
                .Include(a => a.Veterinary)
                .Include(a => a.Costumer)
                .Include(a => a.Animal)
                .Where(a => a.Veterinary.Id == id)
                .ToList();

            return appointments;
        }

        public List<Models.Appointment> GetAnimalAppointments(int id)
        {
            return context.Appointments
                .Include(a => a.Veterinary)
                .Include(a => a.Costumer)
                .Include(a => a.Animal)
                .Where(a => a.AnimalId == id)
                .ToList();
        }
    }
}