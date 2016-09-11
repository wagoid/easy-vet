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

        public Models.Appointment FindById(int id)
        {
            return getFirstOrDefault(this.context.Appointments, id);
        }

        public Models.Appointment Insert(Models.Appointment appointment)
        {
            this.context.Appointments.Add(appointment);
            this.context.SaveChanges();
            return appointment;
        }

        public bool Delete(int id)
        {
            return delete(this.context.Appointments, id);
        }

        public List<Models.Appointment> GetVeterinaryAppoitment(int id)
        {
            var appointments = context.Appointments
                .Include(v => v.Veterinary)
                .Include(c => c.Costumer)
                .Include(a => a.Animal)
                .Where(v => v.Veterinary.Id == id)
                .ToList();

            return appointments;
        }
    }
}