using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AuctioChain.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddWinLots : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_lots_auctions_auctionId",
                table: "lots");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("14df6ab7-945e-498c-b169-e08544bb3823"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("2ee58f09-ea98-4cd9-aa15-fc8ec7eb7c21"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("d5c08196-3625-46a7-abca-986791de7317"));

            migrationBuilder.AlterColumn<Guid>(
                name: "auctionId",
                table: "lots",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "ApplicationUserId",
                table: "lots",
                type: "uuid",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("3e6fd2cb-a8b1-444b-b5df-4517f7a9f210"), null, "Moderator", "MODERATOR" },
                    { new Guid("537f4c35-42ae-439f-9226-20496488ffc9"), null, "Administrator", "ADMINISTRATOR" },
                    { new Guid("f304447a-bf68-4804-a02d-66ac404752ba"), null, "Member", "MEMBER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_lots_ApplicationUserId",
                table: "lots",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_lots_AspNetUsers_ApplicationUserId",
                table: "lots",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_lots_auctions_auctionId",
                table: "lots",
                column: "auctionId",
                principalTable: "auctions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_lots_AspNetUsers_ApplicationUserId",
                table: "lots");

            migrationBuilder.DropForeignKey(
                name: "FK_lots_auctions_auctionId",
                table: "lots");

            migrationBuilder.DropIndex(
                name: "IX_lots_ApplicationUserId",
                table: "lots");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("3e6fd2cb-a8b1-444b-b5df-4517f7a9f210"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("537f4c35-42ae-439f-9226-20496488ffc9"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("f304447a-bf68-4804-a02d-66ac404752ba"));

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "lots");

            migrationBuilder.AlterColumn<Guid>(
                name: "auctionId",
                table: "lots",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("14df6ab7-945e-498c-b169-e08544bb3823"), null, "Administrator", "ADMINISTRATOR" },
                    { new Guid("2ee58f09-ea98-4cd9-aa15-fc8ec7eb7c21"), null, "Member", "MEMBER" },
                    { new Guid("d5c08196-3625-46a7-abca-986791de7317"), null, "Moderator", "MODERATOR" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_lots_auctions_auctionId",
                table: "lots",
                column: "auctionId",
                principalTable: "auctions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
