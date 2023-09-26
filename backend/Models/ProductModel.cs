using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class ProductModel
{
    [Key]
    public int ProductID{ get; set; }
    [Required]
    [MaxLength(50)]
    public string ProductName { get; set; }
    [Required]
    [MaxLength(50)]
    public string Category { get; set; }
    [Required]
    public float Price { get; set; }
    [Required]
    [MinLength(3),MaxLength(255)]
    public string Description { get; set; }
    [Required]
    public List<ImageModel> ImageURL { get; set; }
    public ImageModel ImageId { get; set; }
}