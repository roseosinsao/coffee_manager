namespace CoffeeManager.Services
{
    using System;
    using CoffeeManager.Models;

    public interface IOrderService
    {
        OrderPieChartModel GetOrderCountPerCoffee(Guid pantryId, Coffee coffee);
    }
}
