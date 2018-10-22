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
        private readonly CoffeeManagerDBContext _context;

        public CoffeesController(CoffeeManagerDBContext context)
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