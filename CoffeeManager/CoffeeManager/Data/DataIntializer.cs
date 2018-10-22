namespace CoffeeManager.Data
{
    using System;
    using System.Collections.Generic;
    using CoffeeManager.Models;
    using System.Linq;

    public class DataIntializer
    {
        public static void Seed(CoffeeManagerDBContext context)
        {
            if (!context.Coffee.Any())
            {
                IList<Coffee> defaultCoffees = new List<Coffee>();
                defaultCoffees.Add(new Coffee() { Id = new Guid("6771ec85-5727-4b1c-adeb-c44aeaadcb95"), Name = "Sweet Latte" });
                defaultCoffees.Add(new Coffee() { Id = new Guid("741520c1-250e-49fa-bbfb-d5b8b39397ea"), Name = "Flat White" });
                defaultCoffees.Add(new Coffee() { Id = new Guid("2c021be4-519d-4663-8db6-d91053acbaf1"), Name = "Double Americano" });
                context.Coffee.AddRange(defaultCoffees);
            }

            if (!context.Ingredient.Any())
            {
                IList<Ingredient> defaultIngredients = new List<Ingredient>();
                defaultIngredients.Add(new Ingredient() { Id = new Guid("b06ef606-e209-46b6-81b2-25a9b3836e6a"), Name = "Milk" });
                defaultIngredients.Add(new Ingredient() { Id = new Guid("a879d6ea-27d2-48b4-96d4-3fb215f3ee9c"), Name = "Coffee Beans" });
                defaultIngredients.Add(new Ingredient() { Id = new Guid("c87ef635-60fe-4c0c-9ff2-981413b24516"), Name = "Sugar" });
                context.AddRange(defaultIngredients);
            }

            if (!context.CoffeeIngredient.Any())
            {
                IList<CoffeeIngredient> defaultCoffeeIngredients = new List<CoffeeIngredient>();
                defaultCoffeeIngredients.Add(new CoffeeIngredient() { CoffeeId = new Guid("6771ec85-5727-4b1c-adeb-c44aeaadcb95"), IngredientId = new Guid("b06ef606-e209-46b6-81b2-25a9b3836e6a"), ValueCost = 3 });
                defaultCoffeeIngredients.Add(new CoffeeIngredient() { CoffeeId = new Guid("6771ec85-5727-4b1c-adeb-c44aeaadcb95"), IngredientId = new Guid("a879d6ea-27d2-48b4-96d4-3fb215f3ee9c"), ValueCost = 2 });
                defaultCoffeeIngredients.Add(new CoffeeIngredient() { CoffeeId = new Guid("6771ec85-5727-4b1c-adeb-c44aeaadcb95"), IngredientId = new Guid("c87ef635-60fe-4c0c-9ff2-981413b24516"), ValueCost = 5 });
                defaultCoffeeIngredients.Add(new CoffeeIngredient() { CoffeeId = new Guid("741520c1-250e-49fa-bbfb-d5b8b39397ea"), IngredientId = new Guid("b06ef606-e209-46b6-81b2-25a9b3836e6a"), ValueCost = 4 });
                defaultCoffeeIngredients.Add(new CoffeeIngredient() { CoffeeId = new Guid("741520c1-250e-49fa-bbfb-d5b8b39397ea"), IngredientId = new Guid("a879d6ea-27d2-48b4-96d4-3fb215f3ee9c"), ValueCost = 2 });
                defaultCoffeeIngredients.Add(new CoffeeIngredient() { CoffeeId = new Guid("741520c1-250e-49fa-bbfb-d5b8b39397ea"), IngredientId = new Guid("c87ef635-60fe-4c0c-9ff2-981413b24516"), ValueCost = 1 });
                defaultCoffeeIngredients.Add(new CoffeeIngredient() { CoffeeId = new Guid("2c021be4-519d-4663-8db6-d91053acbaf1"), IngredientId = new Guid("a879d6ea-27d2-48b4-96d4-3fb215f3ee9c"), ValueCost = 3 });
                context.AddRange(defaultCoffeeIngredients);
            }

            if (!context.Office.Any())
            {
                IList<Office> defaultOffices = new List<Office>();
                defaultOffices.Add(new Office() { Id = new Guid("3c76f0ab-189e-42a0-81c5-df927edc71f6"), Name = "PlayNGo Philippines" });
                context.AddRange(defaultOffices);
            }

            if (!context.Pantry.Any())
            {
                IList<Pantry> defaultPantries = new List<Pantry>();
                defaultPantries.Add(new Pantry() { Id = new Guid("86d146d0-c8cf-4b1f-b9d1-de1bcb910cac"), Name = "PlayNGo Pantry", OfficeId = new Guid("3c76f0ab-189e-42a0-81c5-df927edc71f6") });
                context.AddRange(defaultPantries);
            }

            if (!context.Stock.Any())
            {
                IList<Stock> defaultStocks = new List<Stock>();
                defaultStocks.Add(new Stock() { PantryId = new Guid("86d146d0-c8cf-4b1f-b9d1-de1bcb910cac"), IngredientId = new Guid("b06ef606-e209-46b6-81b2-25a9b3836e6a"), Value = 45 });
                defaultStocks.Add(new Stock() { PantryId = new Guid("86d146d0-c8cf-4b1f-b9d1-de1bcb910cac"), IngredientId = new Guid("a879d6ea-27d2-48b4-96d4-3fb215f3ee9c"), Value = 45 });
                defaultStocks.Add(new Stock() { PantryId = new Guid("86d146d0-c8cf-4b1f-b9d1-de1bcb910cac"), IngredientId = new Guid("c87ef635-60fe-4c0c-9ff2-981413b24516"), Value = 45 });
                context.AddRange(defaultStocks);
            }

            context.SaveChanges();
        }
    }
}
