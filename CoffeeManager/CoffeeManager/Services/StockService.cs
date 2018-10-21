namespace CoffeeManager.Services
{
    using System;
    using System.Linq;
    using CoffeeManager.Models;

    public class StockService : IStockService
    {
        private readonly coffeemanagersqldbContext _context;

        public StockService(coffeemanagersqldbContext context)
        {
            _context = context;
        }

        public bool UpdateIngredientStock(Ingredient ingredient, Guid pantryId, int value)
        {
            var stock = _context.Stock.SingleOrDefault(b => b.PantryId == pantryId && b.IngredientId == ingredient.Id);
            if (stock != null)
            {
                stock.Value += value;
                _context.SaveChanges();
                return true;
            } else
            {
                stock = new Stock();
                stock.IngredientId = ingredient.Id;
                stock.PantryId = pantryId;
                stock.Value = value;
                _context.Stock.Add(stock);
                _context.SaveChanges();
                return true;
            }
        }

        public void InitialPantryStock(Guid pantryId)
        {
            var ingredients = _context.Ingredient.ToList();
            ingredients.ForEach(ingredient => {
                UpdateIngredientStock(ingredient, pantryId, 45);
            });
        }
    }
}
