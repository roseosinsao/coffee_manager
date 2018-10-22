namespace CoffeeManager.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CoffeeManager.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class StocksController : ControllerBase
    {
        private readonly CoffeeManagerDBContext _context;

        public StocksController(CoffeeManagerDBContext context)
        {
            _context = context;
        }

        // GET: api/Stocks
        [HttpGet]
        public IEnumerable<Stock> GetStock()
        {
            return _context.Stock;
        }

        // GET: api/Stocks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStock([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stock = await _context.Stock.FindAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock);
        }

        // GET: api/Pantries/5
        [HttpGet("pantry/{pantryId}")]
        public async Task<IActionResult> GetStockPerPantry([FromRoute] Guid pantryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pantry = await _context.Stock.Where(x => x.PantryId == pantryId).Include("Ingredient").OrderByDescending(s => s.Ingredient.Name).ToListAsync();

            if (pantry == null)
            {
                return NotFound();
            }

            return Ok(pantry);
        }

        // PUT: api/Stocks/5
        [HttpPut]
        public async Task<IActionResult> PutStock([FromBody] Stock stock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(stock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/Stocks
        [HttpPost]
        public async Task<IActionResult> PostStock([FromBody] Stock stock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Stock.Add(stock);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StockExists(stock.PantryId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStock", new { id = stock.PantryId }, stock);
        }

        private bool StockExists(Guid id)
        {
            return _context.Stock.Any(e => e.PantryId == id);
        }
    }
}