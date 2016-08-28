namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeBirthDate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "BirthDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.Users", "BirdhDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Users", "BirdhDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.Users", "BirthDate");
        }
    }
}
