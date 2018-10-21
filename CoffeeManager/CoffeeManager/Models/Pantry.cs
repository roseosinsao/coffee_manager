namespace CoffeeManager.Models
{
    using System;
    using System.Collections.Generic;

    public partial class Pantry
    {
        public Pantry()
        {
            Orders = new HashSet<Orders>();
            Stock = new HashSet<Stock>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid OfficeId { get; set; }

        public Office Office { get; set; }
        public ICollection<Orders> Orders { get; set; }
        public ICollection<Stock> Stock { get; set; }
    }
}
