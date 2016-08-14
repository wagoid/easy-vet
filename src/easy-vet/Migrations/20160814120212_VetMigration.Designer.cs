using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using easy_vet.Models;

namespace easyvet.Migrations
{
    [DbContext(typeof(VetContext))]
    [Migration("20160814120212_VetMigration")]
    partial class VetMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("easy_vet.Models.Animal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Name");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Animals");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Animal");
                });

            modelBuilder.Entity("easy_vet.Models.Dog", b =>
                {
                    b.HasBaseType("easy_vet.Models.Animal");

                    b.Property<string>("Breed");

                    b.Property<decimal>("PawSize");

                    b.ToTable("Dog");

                    b.HasDiscriminator().HasValue("Dog");
                });
        }
    }
}
