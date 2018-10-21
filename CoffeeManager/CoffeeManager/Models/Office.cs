namespace CoffeeManager.Models
{
    using System;
    using System.Collections.Generic;

    public partial class Office
    {
        public Office()
        {
            Pantry = new HashSet<Pantry>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }

        public ICollection<Pantry> Pantry { get; set; }
    }
}
