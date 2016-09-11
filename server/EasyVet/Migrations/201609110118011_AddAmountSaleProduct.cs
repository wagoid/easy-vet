namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAmountSaleProduct : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SaleProducts", "Amount", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SaleProducts", "Amount");
        }
    }
}
