namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCostumerRefToSale : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sales", "Costumer_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.Sales", "Costumer_Id");
            AddForeignKey("dbo.Sales", "Costumer_Id", "dbo.Costumers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sales", "Costumer_Id", "dbo.Costumers");
            DropIndex("dbo.Sales", new[] { "Costumer_Id" });
            DropColumn("dbo.Sales", "Costumer_Id");
        }
    }
}
