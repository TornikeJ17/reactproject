using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers;

public class UserController : Controller
{
    private readonly ApplicationDbContext _context;
    private const string ImageDirectory = "wwwroot/images/Users";
    
    public UserController(ApplicationDbContext applicationDbContext)
    {
        _context = applicationDbContext;
    }
    [HttpGet]
    [Route("user-list")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.User.ToListAsync();
        return Ok(users);
    }
    [HttpPost]
    [Route("user-create")]
    public async Task<IActionResult> CreateUsers([FromForm] User request)
    {
        try
        {
            var newUser = new User
            {
                UserName = request.UserName,
                UserSurname = request.UserSurname,
                Password = request.Password,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                Token = Guid.NewGuid().ToString(),
                ImagePaths = new List<ImageFile>(),
                Gender = request.Gender,
                DateOfBirth = request.DateOfBirth,
                Country = request.Country,
                City = request.City,
                PostalCode = request.PostalCode
            };
            if (request.Image != null)
            {
                foreach (var formFile in request.Image)
                {
                    if (formFile.Length > 0)
                    {
                        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName);
                        var filePath = Path.Combine(ImageDirectory, fileName);

                        Directory.CreateDirectory(ImageDirectory);

                        using var stream = new FileStream(filePath, FileMode.Create);
                        await formFile.CopyToAsync(stream);
                        newUser.ImagePaths.Add(new ImageFile { ImagePaths = filePath});

                    }
                }
            }

            await _context.User.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return Ok(newUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}