namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCostumerIdToAnimal : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Animals", name: "Owner_Id", newName: "OwnerId");
            RenameIndex(table: "dbo.Animals", name: "IX_Owner_Id", newName: "IX_OwnerId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Animals", name: "IX_OwnerId", newName: "IX_Owner_Id");
            RenameColumn(table: "dbo.Animals", name: "OwnerId", newName: "Owner_Id");
        }
    }
}
