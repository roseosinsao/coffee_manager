using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoffeeManager.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Coffee",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coffee", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ingredient",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredient", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Office",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Office", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CoffeeIngredient",
                columns: table => new
                {
                    CoffeeId = table.Column<Guid>(nullable: false),
                    IngredientId = table.Column<Guid>(nullable: false),
                    ValueCost = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoffeeIngredient", x => new { x.CoffeeId, x.IngredientId });
                    table.ForeignKey(
                        name: "FK_CoffeeIngredient_Coffee_CoffeeId",
                        column: x => x.CoffeeId,
                        principalTable: "Coffee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CoffeeIngredient_Ingredient_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredient",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pantry",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
                    OfficeId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pantry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pantry_Office",
                        column: x => x.OfficeId,
                        principalTable: "Office",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
                    CoffeeId = table.Column<Guid>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    PantryId = table.Column<Guid>(nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Coffee_CoffeeId",
                        column: x => x.CoffeeId,
                        principalTable: "Coffee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_Pantry",
                        column: x => x.PantryId,
                        principalTable: "Pantry",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Stock",
                columns: table => new
                {
                    PantryId = table.Column<Guid>(nullable: false),
                    IngredientId = table.Column<Guid>(nullable: false),
                    Value = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock", x => new { x.PantryId, x.IngredientId });
                    table.ForeignKey(
                        name: "FK_Stock_Ingredient_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredient",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stock_Pantry_PantryId",
                        column: x => x.PantryId,
                        principalTable: "Pantry",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CoffeeIngredient_IngredientId",
                table: "CoffeeIngredient",
                column: "IngredientId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CoffeeId",
                table: "Orders",
                column: "CoffeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PantryId",
                table: "Orders",
                column: "PantryId");

            migrationBuilder.CreateIndex(
                name: "IX_Pantry_OfficeId",
                table: "Pantry",
                column: "OfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_IngredientId",
                table: "Stock",
                column: "IngredientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CoffeeIngredient");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Stock");

            migrationBuilder.DropTable(
                name: "Coffee");

            migrationBuilder.DropTable(
                name: "Ingredient");

            migrationBuilder.DropTable(
                name: "Pantry");

            migrationBuilder.DropTable(
                name: "Office");
        }
    }
}
