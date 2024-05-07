using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class MoreOnSupportingFile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "SupportingFiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ItemType",
                table: "SupportingFiles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "SupportingFiles");

            migrationBuilder.DropColumn(
                name: "ItemType",
                table: "SupportingFiles");
        }
    }
}
