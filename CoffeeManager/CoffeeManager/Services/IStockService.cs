namespace CoffeeManager.Services
{
    using System;
    using CoffeeManager.Models;

    public interface IStockService
    {
        bool UpdateIngredientStock(Ingredient ingredient, Guid pantryId, int value);

        void InitialPantryStock(Guid pantryId);
    }
}
