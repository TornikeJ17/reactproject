using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class ProductModel
{
    [Key]
    public int Id { get; set; }
    public string? ProductName { get; set; }
    public string? Category  { get; set; }
    public float Price { get; set; }
    public string? Description { get; set; }
    public ICollection<ImageModel> Image { get; set; }
    public ImageModel? ImageId { get; set; }
}