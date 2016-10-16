namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDianosisAppointment : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Appointments", "Diagnosis", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Appointments", "Diagnosis");
        }
    }
}
