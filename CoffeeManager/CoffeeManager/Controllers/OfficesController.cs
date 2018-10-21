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
    public class OfficesController : ControllerBase
    {
        private readonly coffeemanagersqldbContext _context;

        public OfficesController(coffeemanagersqldbContext context)
        {
            _context = context;
        }

        // GET: api/Offices
        [HttpGet]
        public IEnumerable<Office> GetOffice()
        {
            return _context.Office.Include("Pantry"); ;
        }
        
        // POST: api/Offices
        [HttpPost]
        public async Task<IActionResult> PostOffice([FromBody] Office office)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Office.Add(office);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OfficeExists(office.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOffice", new { id = office.Id }, office);
        }
        
        private bool OfficeExists(Guid id)
        {
            return _context.Office.Any(e => e.Id == id);
        }
    }
}