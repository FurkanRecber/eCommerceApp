﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eCommerceAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProductID",
                table: "Files",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Files_ProductID",
                table: "Files",
                column: "ProductID");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Products_ProductID",
                table: "Files",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Products_ProductID",
                table: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Files_ProductID",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "ProductID",
                table: "Files");
        }
    }
}
