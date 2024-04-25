using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class ReLink : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Offers_TaskId",
                table: "Offers",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Tasks_TaskId",
                table: "Offers",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Tasks_TaskId",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Offers_TaskId",
                table: "Offers");
        }
    }
}
