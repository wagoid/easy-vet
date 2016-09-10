namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateAppointmentModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Appointments", "Animal_Id", c => c.Int(nullable: false));
            AddColumn("dbo.Appointments", "Costumer_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.Appointments", "Animal_Id");
            CreateIndex("dbo.Appointments", "Costumer_Id");
            AddForeignKey("dbo.Appointments", "Animal_Id", "dbo.Animals", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Appointments", "Costumer_Id", "dbo.Costumers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Appointments", "Costumer_Id", "dbo.Costumers");
            DropForeignKey("dbo.Appointments", "Animal_Id", "dbo.Animals");
            DropIndex("dbo.Appointments", new[] { "Costumer_Id" });
            DropIndex("dbo.Appointments", new[] { "Animal_Id" });
            DropColumn("dbo.Appointments", "Costumer_Id");
            DropColumn("dbo.Appointments", "Animal_Id");
        }
    }
}
