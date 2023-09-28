using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        [HttpGet("GetResponse")]
        public ActionResult GetResponse()
        {
            return Ok("return success");
        }

        [HttpGet("AllProducts")]
        public IEnumerable<Product> GetAllProduct()
        {
            var prodList = new List<Product>()
            {
                new Product() { ProductId = 1, Name = "Product 1", Price = 100 },
                new Product() { ProductId = 2, Name = "Product 2", Price = 200 },
                new Product() { ProductId = 3, Name = "Product 3", Price = 300 },
            };
            return prodList;
        }

        // If this is meant to be an endpoint, add [HttpPost] and make it public
        public IEnumerable<Product> SaveProduct()
        {
            return GetAllProduct();
        }

        public class Product
        {
            public int ProductId { get; set; }
            public string Name { get; set; }
            public decimal Price { get; set; }
        }
    }
}