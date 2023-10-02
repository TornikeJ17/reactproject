using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models;

public class Product
{
    public int ProductId { get; set; }
    public string? ProductName { get; set; }
    public string? Category { get; set; }
    public decimal? Price { get; set; }
    public string? SKU { get; set; }
    public string? Description { get; set; }
    [NotMapped]
    public List<IFormFile>? Image { get; set; }
    [NotMapped]
    public ICollection<string>? ImagePaths { get; set; } 
    public string? StockStatus { get; set; }
    public string? Payment { get; set; }
}