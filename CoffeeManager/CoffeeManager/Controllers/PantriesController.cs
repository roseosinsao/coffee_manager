namespace CoffeeManager.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CoffeeManager.Models;
    using CoffeeManager.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class PantriesController : ControllerBase
    {
        private readonly CoffeeManagerDBContext _context;
        private readonly StockService stockRepository;

        public PantriesController(CoffeeManagerDBContext context)
        {
            _context = context;
            this.stockRepository = new StockService(_context);
        }

        // GET: api/Pantries
        [HttpGet]
        public IEnumerable<Pantry> GetPantry()
        {
            return _context.Pantry;
        }

        // GET: api/Pantries/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPantry([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pantry = await _context.Pantry.FindAsync(id);

            if (pantry == null)
            {
                return NotFound();
            }

            return Ok(pantry);
        }

        // GET: api/Pantries/5
        [HttpGet("office/{officeId}")]
        public async Task<IActionResult> GetPantriesByOffice([FromRoute] Guid officeId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pantry = await _context.Pantry.Where(x => x.OfficeId == officeId).ToListAsync();

            if (pantry == null)
            {
                return NotFound();
            }

            return Ok(pantry);
        }

        // POST: api/Pantries
        [HttpPost]
        public async Task<IActionResult> PostPantry([FromBody] Pantry pantry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Pantry.Add(pantry);
            try
            {
                await _context.SaveChangesAsync();
                this.stockRepository.InitialPantryStock(pantry.Id);
            }
            catch (DbUpdateException)
            {
                if (PantryExists(pantry.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPantry", new { id = pantry.Id }, pantry);
        }
        
        private bool PantryExists(Guid id)
        {
            return _context.Pantry.Any(e => e.Id == id);
        }
    }
}