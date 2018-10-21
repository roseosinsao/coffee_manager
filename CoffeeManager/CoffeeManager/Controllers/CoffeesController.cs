namespace CoffeeManager.Controllers
{
    using System.Collections.Generic;
    using CoffeeManager.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class CoffeesController : ControllerBase
    {
        private readonly coffeemanagersqldbContext _context;

        public CoffeesController(coffeemanagersqldbContext context)
        {
            _context = context;
        }

        // GET: api/Coffees
        [HttpGet]
        public IEnumerable<Coffee> GetCoffee()
        {
            return _context.Coffee.Include("CoffeeIngredient.Ingredient");
        }
    }
}