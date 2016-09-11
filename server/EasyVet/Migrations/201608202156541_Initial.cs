namespace EasyVet.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Addresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StreetType = c.String(nullable: false),
                        StreetName = c.String(nullable: false),
                        Number = c.Int(nullable: false),
                        Complement = c.String(),
                        Neighbourhood = c.String(nullable: false),
                        Municipality = c.String(nullable: false),
                        State = c.String(nullable: false),
                        ZipCode = c.String(nullable: false),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Animals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Type = c.Int(nullable: false),
                        Gender = c.String(nullable: false),
                        Age = c.Int(nullable: false),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        Breed = c.String(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                        Owner_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Costumers", t => t.Owner_Id)
                .Index(t => t.Owner_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Cpf = c.String(nullable: false),
                        Name = c.String(nullable: false),
                        Password = c.String(nullable: false),
                        BirdhDate = c.DateTime(nullable: false),
                        PhoneNumber = c.String(nullable: false),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        Salary = c.Decimal(precision: 18, scale: 2),
                        Discriminator = c.String(maxLength: 128),
                        Address_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Addresses", t => t.Address_Id)
                .Index(t => t.Address_Id);
            
            CreateTable(
                "dbo.Appointments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Date = c.DateTime(nullable: false),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        Veterinary_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Veterinaries", t => t.Veterinary_Id)
                .Index(t => t.Veterinary_Id);
            
            CreateTable(
                "dbo.Payments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Method = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Description = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SaleProducts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        Product_Id = c.Int(nullable: false),
                        Sale_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Products", t => t.Product_Id, cascadeDelete: true)
                .ForeignKey("dbo.Sales", t => t.Sale_Id, cascadeDelete: true)
                .Index(t => t.Product_Id)
                .Index(t => t.Sale_Id);

            CreateTable(
                "dbo.Sales",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Value = c.Decimal(nullable: false, precision: 18, scale: 2),
                    RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Stocks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Quantity = c.Int(nullable: false),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        Location_Id = c.Int(nullable: false),
                        Product_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Addresses", t => t.Location_Id, cascadeDelete: true)
                .ForeignKey("dbo.Products", t => t.Product_Id, cascadeDelete: true)
                .Index(t => t.Location_Id)
                .Index(t => t.Product_Id);
            
            CreateTable(
                "dbo.Cashier",
                c => new
                    {
                        Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.Costumers",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Email = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.SalesPeople",
                c => new
                    {
                        Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.Veterinaries",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Specialty = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Id)
                .Index(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Veterinaries", "Id", "dbo.Users");
            DropForeignKey("dbo.SalesPeople", "Id", "dbo.Users");
            DropForeignKey("dbo.Costumers", "Id", "dbo.Users");
            DropForeignKey("dbo.Cashier", "Id", "dbo.Users");
            DropForeignKey("dbo.Users", "Address_Id", "dbo.Addresses");
            DropForeignKey("dbo.Stocks", "Product_Id", "dbo.Products");
            DropForeignKey("dbo.Stocks", "Location_Id", "dbo.Addresses");
            DropForeignKey("dbo.SaleProducts", "Sale_Id", "dbo.Sales");
            DropForeignKey("dbo.SaleProducts", "Product_Id", "dbo.Products");
            DropForeignKey("dbo.Appointments", "Veterinary_Id", "dbo.Veterinaries");
            DropForeignKey("dbo.Animals", "Owner_Id", "dbo.Costumers");
            DropIndex("dbo.Veterinaries", new[] { "Id" });
            DropIndex("dbo.SalesPeople", new[] { "Id" });
            DropIndex("dbo.Costumers", new[] { "Id" });
            DropIndex("dbo.Cashier", new[] { "Id" });
            DropIndex("dbo.Stocks", new[] { "Product_Id" });
            DropIndex("dbo.Stocks", new[] { "Location_Id" });
            DropIndex("dbo.SaleProducts", new[] { "Sale_Id" });
            DropIndex("dbo.SaleProducts", new[] { "Product_Id" });
            DropIndex("dbo.Appointments", new[] { "Veterinary_Id" });
            DropIndex("dbo.Users", new[] { "Address_Id" });
            DropIndex("dbo.Animals", new[] { "Owner_Id" });
            DropTable("dbo.Veterinaries");
            DropTable("dbo.SalesPeople");
            DropTable("dbo.Costumers");
            DropTable("dbo.Cashier");
            DropTable("dbo.Stocks");
            DropTable("dbo.Sales");
            DropTable("dbo.SaleProducts");
            DropTable("dbo.Products");
            DropTable("dbo.Payments");
            DropTable("dbo.Appointments");
            DropTable("dbo.Users");
            DropTable("dbo.Animals");
            DropTable("dbo.Addresses");
        }
    }
}
