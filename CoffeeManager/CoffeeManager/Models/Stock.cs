namespace CoffeeManager.Models
{
    using System;

    public partial class Stock
    {
        public Guid PantryId { get; set; }
        public Guid IngredientId { get; set; }
        public int Value { get; set; }

        public Ingredient Ingredient { get; set; }
        public Pantry Pantry { get; set; }
    }
}
