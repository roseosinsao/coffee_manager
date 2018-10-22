namespace CoffeeManager.Services
{
    using System;
    using System.Linq;
    using CoffeeManager.Models;

    public class OrderService : IOrderService
    {
        private readonly CoffeeManagerDBContext _context;

        public OrderService(CoffeeManagerDBContext context)
        {
            _context = context;
        }

        public OrderPieChartModel GetOrderCountPerCoffee(Guid pantryId, Coffee coffee)
        {
           var orderCount = _context.Orders.Where(x => x.PantryId == pantryId && x.CoffeeId == coffee.Id).Count();
            OrderPieChartModel chart = new OrderPieChartModel()
            {
                CoffeeName = coffee.Name,
                Total = orderCount
            };

            return chart;
        }
    }
}
