namespace CoffeeManager.Models
{
    using System;

    public partial class CoffeeIngredient
    {
        public Guid CoffeeId { get; set; }
        public Guid IngredientId { get; set; }
        public int ValueCost { get; set; }

        public Coffee Coffee { get; set; }
        public Ingredient Ingredient { get; set; }
    }
}
