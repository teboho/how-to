using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class ModifyPortfolioWithFKs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdentityNo",
                table: "Portfolios");

            migrationBuilder.DropColumn(
                name: "Links",
                table: "Portfolios");

            migrationBuilder.AddColumn<int>(
                name: "ItemType",
                table: "Portfolios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "ProfileId",
                table: "Portfolios",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "StoredFileId",
                table: "Portfolios",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Portfolios_ProfileId",
                table: "Portfolios",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Portfolios_StoredFileId",
                table: "Portfolios",
                column: "StoredFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Portfolios_Profiles_ProfileId",
                table: "Portfolios",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Portfolios_StoredFiles_StoredFileId",
                table: "Portfolios",
                column: "StoredFileId",
                principalTable: "StoredFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Portfolios_Profiles_ProfileId",
                table: "Portfolios");

            migrationBuilder.DropForeignKey(
                name: "FK_Portfolios_StoredFiles_StoredFileId",
                table: "Portfolios");

            migrationBuilder.DropIndex(
                name: "IX_Portfolios_ProfileId",
                table: "Portfolios");

            migrationBuilder.DropIndex(
                name: "IX_Portfolios_StoredFileId",
                table: "Portfolios");

            migrationBuilder.DropColumn(
                name: "ItemType",
                table: "Portfolios");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "Portfolios");

            migrationBuilder.DropColumn(
                name: "StoredFileId",
                table: "Portfolios");

            migrationBuilder.AddColumn<string>(
                name: "IdentityNo",
                table: "Portfolios",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Links",
                table: "Portfolios",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
