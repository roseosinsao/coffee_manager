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
    public class OrdersController : ControllerBase
    {
        private readonly coffeemanagersqldbContext _context;
        private readonly IStockService stockService;
        private readonly IOrderService orderService;

        public OrdersController(coffeemanagersqldbContext context, IStockService stockService, IOrderService orderService)
        {
            _context = context;
            this.stockService = stockService;
            this.orderService = orderService;
        }

        // GET: api/Orders
        [HttpGet]
        public IEnumerable<Orders> GetOrders()
        {
            return _context.Orders.Include("Coffee").OrderByDescending(x => x.OrderDate);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrders([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orders = await _context.Orders.FindAsync(id);

            if (orders == null)
            {
                return NotFound();
            }

            return Ok(orders);
        }

        // GET: api/Pantries/pantry/5
        [HttpGet("pantry/{pantryId}")]
        public async Task<IActionResult> GetOrdersPerPantry([FromRoute] Guid pantryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pantry = await _context.Orders.Where(x => x.PantryId == pantryId).Include("Coffee").OrderByDescending(x => x.OrderDate).ToListAsync();

            if (pantry == null)
            {
                return NotFound();
            }

            return Ok(pantry);
        }

        // GET: api/Pantries/pantry/5
        [HttpGet("chart/{pantryId}")]
        public async Task<IActionResult> GetOrderChartDetails([FromRoute] Guid pantryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<OrderPieChartModel> chartDatas = new List<OrderPieChartModel>();

            var coffees = await _context.Coffee.ToListAsync();
            coffees.ForEach(coffee => {
                var chart = this.orderService.GetOrderCountPerCoffee(pantryId, coffee);
                chartDatas.Add(chart);
            });

            return Ok(chartDatas);
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<IActionResult> PostOrders([FromBody] Orders orders)
        {
            var coffeeHolder = orders.Coffee;
            orders.Coffee = null;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Orders.Add(orders);
            try
            {
                await _context.SaveChangesAsync();

                foreach (CoffeeIngredient coffeeIngredient in coffeeHolder.CoffeeIngredient)
                {
                    this.stockService.UpdateIngredientStock(coffeeIngredient.Ingredient, orders.PantryId, -coffeeIngredient.ValueCost);
                }
            }
            catch (DbUpdateException e)
            {
                if (OrdersExists(orders.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw e;
                }
            }

            return CreatedAtAction("GetOrders", new { id = orders.Id }, orders);
        }

        private bool OrdersExists(Guid id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}