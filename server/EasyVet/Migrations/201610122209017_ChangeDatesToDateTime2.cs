namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeDatesToDateTime2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Users", "BirthDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Appointments", "Date", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Appointments", "EndDate", c => c.DateTime(precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Payments", "Date", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Payments", "Date", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Appointments", "EndDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Appointments", "Date", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Users", "BirthDate", c => c.DateTime(nullable: false));
        }
    }
}
