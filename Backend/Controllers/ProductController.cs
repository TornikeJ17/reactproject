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
        private readonly IWebHostEnvironment _environment;
        private const string ImageDirectory = "wwwroot/images/products"; // Path to where you want to save images

        public ProductController(ApplicationDbContext applicationDbContext, IWebHostEnvironment environment)
        {
            _context = applicationDbContext;
            _environment = environment;
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
        public async Task<IActionResult> CreateProducts([FromForm] Product request)
        {
            var product = new Product 
            {
                ProductName = request.ProductName,
                Category = request.Category,
                Price = request.Price,
                SKU = request.SKU,
                Description = request.Description,
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

        [HttpPut]
        [Route("product-update")]
        public async Task<IActionResult> UpdateProduct([FromForm] Product request)
        {
            try
            {
            var existingProduct = await _context.Product.FindAsync(request.ProductId);
            if (existingProduct == null)
            {
                return NotFound("Product not found");
            }

            // Update fields
            existingProduct.ProductName = request.ProductName;
            existingProduct.Category = request.Category;
            existingProduct.Price = request.Price;
            existingProduct.SKU = request.SKU;
            existingProduct.Description = request.Description;
            existingProduct.StockStatus = request.StockStatus;
            existingProduct.Payment = request.Payment;

            // Handle image update if new images are provided
            if (request.Image != null && request.Image.Count > 0)
            {
                // Remove existing images from server and from the product's ImagePaths list
                // (This assumes you want to replace all images. Adjust as needed.)
                foreach (var imagePath in existingProduct.ImagePaths)
                {
                    System.IO.File.Delete(imagePath);
                }
                existingProduct.ImagePaths.Clear();
                List<string> updatedImagePaths = new List<string>(existingProduct.ImagePaths);
                
                foreach (var imagePath in updatedImagePaths)
                {
                    System.IO.File.Delete(imagePath);
                }
                updatedImagePaths.Clear();
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
                        existingProduct.ImagePaths.Add(filePath);
                    }
                }
                existingProduct.ImagePaths = updatedImagePaths;
            }

            // Save changes
            _context.Update(existingProduct);
            await _context.SaveChangesAsync();

            return Ok(existingProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("product-delete")]
        public async Task<IActionResult> DeleteProducts(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            if (product.ImagePaths != null)
            {
                foreach (var imagePath in product.ImagePaths)
                {
                    try
                    {
                        System.IO.File.Delete(imagePath);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Failed to delete file {imagePath}. Error: {ex.Message}");
                    }
                }
                
            }
            _context.Product.Remove(product);
            _context.SaveChanges();
            return Ok(product);
        }
    }
}
