namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddJustificationAppointment : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Appointments", "Justification", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Appointments", "Justification");
        }
    }
}
