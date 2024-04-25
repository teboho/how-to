using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class DeLink : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Tasks_TaskId",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Offers_TaskId",
                table: "Offers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                onDelete: ReferentialAction.Cascade);
        }
    }
}
