using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class BioOnProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "Profiles",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bio",
                table: "Profiles");
        }
    }
}
