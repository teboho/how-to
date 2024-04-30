using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class Restruc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserFileStore");

            migrationBuilder.DropColumn(
                name: "IsVerified",
                table: "Profiles");

            migrationBuilder.RenameColumn(
                name: "PhotoId",
                table: "Profiles",
                newName: "StoredFileId");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "StoredFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "StoredFiles",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "StoredFiles",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "StoredFiles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "StoredFiles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "StoredFiles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "StoredFiles",
                type: "bigint",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "StoredFiles");

            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "StoredFiles");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "StoredFiles");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "StoredFiles");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "StoredFiles");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "StoredFiles");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "StoredFiles");

            migrationBuilder.RenameColumn(
                name: "StoredFileId",
                table: "Profiles",
                newName: "PhotoId");

            migrationBuilder.AddColumn<bool>(
                name: "IsVerified",
                table: "Profiles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "UserFileStore",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFileStore", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserFileStore_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFileStore_StoredFiles_FileId",
                        column: x => x.FileId,
                        principalTable: "StoredFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserFileStore_FileId",
                table: "UserFileStore",
                column: "FileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFileStore_UserId",
                table: "UserFileStore",
                column: "UserId");
        }
    }
}
