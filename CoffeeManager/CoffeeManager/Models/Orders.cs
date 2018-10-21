namespace CoffeeManager.Models
{
    using System;

    public partial class Orders
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CoffeeId { get; set; }
        public int Quantity { get; set; }
        public Guid PantryId { get; set; }
        public DateTime? OrderDate { get; set; }

        public Coffee Coffee { get; set; }
        public Pantry Pantry { get; set; }
    }
}
