namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AppointmentUpdate : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Appointments", name: "Animal_Id", newName: "AnimalId");
            RenameColumn(table: "dbo.Appointments", name: "Costumer_Id", newName: "CostumerId");
            RenameColumn(table: "dbo.Appointments", name: "Veterinary_Id", newName: "VeterinaryId");
            RenameIndex(table: "dbo.Appointments", name: "IX_Veterinary_Id", newName: "IX_VeterinaryId");
            RenameIndex(table: "dbo.Appointments", name: "IX_Costumer_Id", newName: "IX_CostumerId");
            RenameIndex(table: "dbo.Appointments", name: "IX_Animal_Id", newName: "IX_AnimalId");
            AddColumn("dbo.Appointments", "EndDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Appointments", "EndDate");
            RenameIndex(table: "dbo.Appointments", name: "IX_AnimalId", newName: "IX_Animal_Id");
            RenameIndex(table: "dbo.Appointments", name: "IX_CostumerId", newName: "IX_Costumer_Id");
            RenameIndex(table: "dbo.Appointments", name: "IX_VeterinaryId", newName: "IX_Veterinary_Id");
            RenameColumn(table: "dbo.Appointments", name: "VeterinaryId", newName: "Veterinary_Id");
            RenameColumn(table: "dbo.Appointments", name: "CostumerId", newName: "Costumer_Id");
            RenameColumn(table: "dbo.Appointments", name: "AnimalId", newName: "Animal_Id");
        }
    }
}
