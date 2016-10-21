namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AppointmentStartDate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Appointments", "StartDate", c => c.DateTime(precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Appointments", "StartDate");
        }
    }
}
