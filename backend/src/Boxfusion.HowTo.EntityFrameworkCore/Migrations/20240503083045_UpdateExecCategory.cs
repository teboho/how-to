using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boxfusion.HowTo.Migrations
{
    /// <inheritdoc />
    public partial class UpdateExecCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExecutorCategories_AbpUsers_UserId",
                table: "ExecutorCategories");

            migrationBuilder.DropIndex(
                name: "IX_ExecutorCategories_UserId",
                table: "ExecutorCategories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ExecutorCategories");

            migrationBuilder.AddColumn<Guid>(
                name: "ExecutorId",
                table: "ExecutorCategories",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ExecutorCategories_ExecutorId",
                table: "ExecutorCategories",
                column: "ExecutorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExecutorCategories_Profiles_ExecutorId",
                table: "ExecutorCategories",
                column: "ExecutorId",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExecutorCategories_Profiles_ExecutorId",
                table: "ExecutorCategories");

            migrationBuilder.DropIndex(
                name: "IX_ExecutorCategories_ExecutorId",
                table: "ExecutorCategories");

            migrationBuilder.DropColumn(
                name: "ExecutorId",
                table: "ExecutorCategories");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "ExecutorCategories",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_ExecutorCategories_UserId",
                table: "ExecutorCategories",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExecutorCategories_AbpUsers_UserId",
                table: "ExecutorCategories",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
