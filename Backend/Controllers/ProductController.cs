using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.IO;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private const string ImageDirectory = "wwwroot/images/products"; // Path to where you want to save images

        public ProductController(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        [HttpGet]
        [Route("product-list")]
        public async Task<IActionResult> GetAsync()
        {
            var products = await _context.Product.Include(p => p.Image).ToListAsync(); // Including Images while fetching
            return Ok(products);
        }

        [HttpPost]
        [Route("product-create")]
        public async Task<IActionResult> PostAsync([FromForm] ProductCreateRequest request)
        {
            var product = new Product 
            {
                ProductName = request.ProductName,
                Category = request.Category,
                Price = request.Price,
                SKU = request.SKU,
                Description = request.Description,
                StockStatus = request.StockStatus,
                Payment = request.Payment,
                // You can leave Images uninitialized here as we'll be adding to it below
            };

            if (request.Images != null)
            {
                foreach (var formFile in request.Images)
                {
                    if (formFile.Length > 0)
                    {
                        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName);
                        var filePath = Path.Combine(ImageDirectory, fileName);

                        // Ensure the directory exists
                        Directory.CreateDirectory(ImageDirectory);

                        using var stream = new FileStream(filePath, FileMode.Create);
                        await formFile.CopyToAsync(stream);

                        product.Image.Add(new Image { ImageUrl = filePath });
                    }
                }
            }

            _context.Product.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }
    }
}
