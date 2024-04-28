using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class DeLinkProfileAndPhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profiles_Photos_PhotoId",
                table: "Profiles");

            migrationBuilder.DropIndex(
                name: "IX_Profiles_PhotoId",
                table: "Profiles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Profiles_PhotoId",
                table: "Profiles",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profiles_Photos_PhotoId",
                table: "Profiles",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
