using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class LinkPaymentTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Payments",
                newName: "Transaction");

            migrationBuilder.AddColumn<string>(
                name: "Bank",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Reference",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TaskId",
                table: "Payments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Payments_TaskId",
                table: "Payments",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Tasks_TaskId",
                table: "Payments",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Tasks_TaskId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_TaskId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "Bank",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "Reference",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "Transaction",
                table: "Payments",
                newName: "Description");
        }
    }
}
