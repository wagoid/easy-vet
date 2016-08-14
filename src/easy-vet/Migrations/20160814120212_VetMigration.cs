using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace easyvet.Migrations
{
    public partial class VetMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Animals",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Breed",
                table: "Animals",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PawSize",
                table: "Animals",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "Breed",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "PawSize",
                table: "Animals");
        }
    }
}
