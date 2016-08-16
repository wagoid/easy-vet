using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using easy_vet.Models;

namespace easyvet.Migrations
{
    [DbContext(typeof(VetContext))]
    [Migration("20160816013014_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("easy_vet.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Complement");

                    b.Property<string>("Municipality")
                        .IsRequired();

                    b.Property<string>("Neighbourhood")
                        .IsRequired();

                    b.Property<int>("Number");

                    b.Property<string>("State")
                        .IsRequired();

                    b.Property<string>("StreetName")
                        .IsRequired();

                    b.Property<string>("StreetType")
                        .IsRequired();

                    b.Property<string>("ZipCode")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("easy_vet.Models.Animal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Age");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Gender")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("OwnerId");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Animals");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Animal");
                });

            modelBuilder.Entity("easy_vet.Models.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("VeterinaryId");

                    b.HasKey("Id");

                    b.HasIndex("VeterinaryId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("easy_vet.Models.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("Method");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("easy_vet.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<decimal>("Price");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("easy_vet.Models.Sale", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Value");

                    b.HasKey("Id");

                    b.ToTable("Sales");
                });

            modelBuilder.Entity("easy_vet.Models.SaleProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ProductId")
                        .IsRequired();

                    b.Property<int?>("SaleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("SaleId");

                    b.ToTable("SaleProducts");
                });

            modelBuilder.Entity("easy_vet.Models.Stock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("LocationId")
                        .IsRequired();

                    b.Property<int?>("ProductId")
                        .IsRequired();

                    b.Property<int>("Quantity");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.HasIndex("ProductId");

                    b.ToTable("Stocks");
                });

            modelBuilder.Entity("easy_vet.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AddressId");

                    b.Property<DateTime>("BirdhDate");

                    b.Property<string>("Cpf")
                        .IsRequired();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("PhoneNumber")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("User");
                });

            modelBuilder.Entity("easy_vet.Models.Dog", b =>
                {
                    b.HasBaseType("easy_vet.Models.Animal");

                    b.Property<string>("Breed");

                    b.ToTable("Dog");

                    b.HasDiscriminator().HasValue("Dog");
                });

            modelBuilder.Entity("easy_vet.Models.Costumer", b =>
                {
                    b.HasBaseType("easy_vet.Models.User");

                    b.Property<string>("Email");

                    b.ToTable("Costumers");

                    b.HasDiscriminator().HasValue("Costumer");
                });

            modelBuilder.Entity("easy_vet.Models.Employee", b =>
                {
                    b.HasBaseType("easy_vet.Models.User");

                    b.Property<decimal>("Salary");

                    b.ToTable("Employees");

                    b.HasDiscriminator().HasValue("Employee");
                });

            modelBuilder.Entity("easy_vet.Models.Cashier", b =>
                {
                    b.HasBaseType("easy_vet.Models.Employee");


                    b.ToTable("Cashiers");

                    b.HasDiscriminator().HasValue("Cashier");
                });

            modelBuilder.Entity("easy_vet.Models.SalesPerson", b =>
                {
                    b.HasBaseType("easy_vet.Models.Employee");

                    b.Property<string>("Specialty");

                    b.ToTable("SalesPerson");

                    b.HasDiscriminator().HasValue("SalesPerson");
                });

            modelBuilder.Entity("easy_vet.Models.Veterinary", b =>
                {
                    b.HasBaseType("easy_vet.Models.Employee");

                    b.Property<string>("Specialty");

                    b.ToTable("Veterinaries");

                    b.HasDiscriminator().HasValue("Veterinary");
                });

            modelBuilder.Entity("easy_vet.Models.Animal", b =>
                {
                    b.HasOne("easy_vet.Models.Costumer", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("easy_vet.Models.Appointment", b =>
                {
                    b.HasOne("easy_vet.Models.Veterinary", "Veterinary")
                        .WithMany()
                        .HasForeignKey("VeterinaryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("easy_vet.Models.SaleProduct", b =>
                {
                    b.HasOne("easy_vet.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("easy_vet.Models.Sale", "Sale")
                        .WithMany()
                        .HasForeignKey("SaleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("easy_vet.Models.Stock", b =>
                {
                    b.HasOne("easy_vet.Models.Address", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("easy_vet.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("easy_vet.Models.User", b =>
                {
                    b.HasOne("easy_vet.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");
                });
        }
    }
}
