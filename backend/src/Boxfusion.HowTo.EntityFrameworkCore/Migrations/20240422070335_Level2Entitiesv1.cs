using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class Level2Entitiesv1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guide_AbpUsers_WriterId",
                table: "Guide");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Guide",
                table: "Guide");

            migrationBuilder.RenameTable(
                name: "Guide",
                newName: "Guides");

            migrationBuilder.RenameIndex(
                name: "IX_Guide_WriterId",
                table: "Guides",
                newName: "IX_Guides_WriterId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Guides",
                table: "Guides",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "BankDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BankDetails_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OwnerId = table.Column<long>(type: "bigint", nullable: false),
                    Amount = table.Column<float>(type: "real", nullable: false),
                    Views = table.Column<int>(type: "int", nullable: false),
                    TimeFrame = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_AbpUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BankDetails_UserId",
                table: "BankDetails",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_OwnerId",
                table: "Tasks",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Guides_AbpUsers_WriterId",
                table: "Guides",
                column: "WriterId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guides_AbpUsers_WriterId",
                table: "Guides");

            migrationBuilder.DropTable(
                name: "BankDetails");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Guides",
                table: "Guides");

            migrationBuilder.RenameTable(
                name: "Guides",
                newName: "Guide");

            migrationBuilder.RenameIndex(
                name: "IX_Guides_WriterId",
                table: "Guide",
                newName: "IX_Guide_WriterId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Guide",
                table: "Guide",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Guide_AbpUsers_WriterId",
                table: "Guide",
                column: "WriterId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
