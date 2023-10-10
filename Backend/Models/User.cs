using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class User
{
    public int UserId { get; set; }
    public string? UserName { get; set; }
    public string? UserSurname { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public string? Token { get; set; }
    [NotMapped]
    public List<IFormFile>? Image { get; set; }
    [NotMapped]
    public ICollection<string>? ImagePaths { get; set; }
    public string? Gender { get; set; }
    public string? DateOfBirth { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? PostalCode { get; set; }
}