namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addVirtual : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Appointments", "EndDate", c => c.DateTime(precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Appointments", "EndDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
    }
}
