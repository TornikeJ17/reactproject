using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class ImageModel
{
    [Key]
    public int ImageId { get; set; }
    public string ImageUrl { get; set; }
}