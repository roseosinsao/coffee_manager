namespace CoffeeManager.Controllers
{
    using System.Collections.Generic;
    using CoffeeManager.Models;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        private readonly coffeemanagersqldbContext _context;

        public IngredientsController(coffeemanagersqldbContext context)
        {
            _context = context;
        }

        // GET: api/Ingredients
        [HttpGet]
        public IEnumerable<Ingredient> GetIngredient()
        {
            return _context.Ingredient;
        }
    }
}