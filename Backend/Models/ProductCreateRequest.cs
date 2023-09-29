using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Models;

public class ProductCreateRequest
{
    [Key]
    public int Id { get; set; }
    public string? ProductName { get; set; }
    public string? Category { get; set; }
    public float? Price { get; set; }
    public string? SKU { get; set; }
    public string? Description { get; set; }
    public string? StockStatus { get; set; }
    public string? Payment { get; set; }
    public List<IFormFile>? Images { get; set; }
}