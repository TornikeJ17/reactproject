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
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Product.ToListAsync();
            return Ok(products);
        }

        [HttpPost]
        [Route("product-create")]
        public async Task<IActionResult> PostAsync([FromForm] Product request)
        {
            var product = new Product 
            {
                ProductName = request.ProductName,
                Category = request.Category,
                Price = request.Price,
                SKU = request.SKU,
                Description = request.Description,
                Image = request.Image != null ? new List<IFormFile>(request.Image) : new List<IFormFile>(),
                ImagePaths = new List<string>(),
                StockStatus = request.StockStatus,
                Payment = request.Payment,
                // You can leave Images uninitialized here as we'll be adding to it below
            };
            if (request.Image != null)
            {
                foreach (var formFile in request.Image)
                {
                    if (formFile.Length > 0)
                    {
                        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName);
                        var filePath = Path.Combine(ImageDirectory, fileName);

                        // Ensure the directory exists
                        Directory.CreateDirectory(ImageDirectory);

                        using var stream = new FileStream(filePath, FileMode.Create);
                        await formFile.CopyToAsync(stream);
                        product.ImagePaths.Add(filePath);
                    }
                }
            }
            _context.Product.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }
    }
}
