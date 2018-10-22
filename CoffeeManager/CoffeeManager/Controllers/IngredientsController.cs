namespace CoffeeManager.Controllers
{
    using System.Collections.Generic;
    using CoffeeManager.Models;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        private readonly CoffeeManagerDBContext _context;

        public IngredientsController(CoffeeManagerDBContext context)
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