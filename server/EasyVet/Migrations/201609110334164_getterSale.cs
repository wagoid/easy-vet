namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class getterSale : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sales", "Costumer_Id", c => c.Int(nullable: false));
            AddColumn("dbo.Sales", "Payment_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.Sales", "Costumer_Id");
            CreateIndex("dbo.Sales", "Payment_Id");
            AddForeignKey("dbo.Sales", "Costumer_Id", "dbo.Costumers", "Id");
            AddForeignKey("dbo.Sales", "Payment_Id", "dbo.Payments", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sales", "Payment_Id", "dbo.Payments");
            DropForeignKey("dbo.Sales", "Costumer_Id", "dbo.Costumers");
            DropIndex("dbo.Sales", new[] { "Payment_Id" });
            DropIndex("dbo.Sales", new[] { "Costumer_Id" });
            DropColumn("dbo.Sales", "Payment_Id");
            DropColumn("dbo.Sales", "Costumer_Id");
        }
    }
}
