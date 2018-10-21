namespace CoffeeManager.Models
{
    using System;
    using System.Collections.Generic;

    public partial class Coffee
    {
        public Coffee()
        {
            CoffeeIngredient = new HashSet<CoffeeIngredient>();
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public ICollection<CoffeeIngredient> CoffeeIngredient { get; set; }
    }
}
