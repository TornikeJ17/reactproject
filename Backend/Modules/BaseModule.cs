
using System.ComponentModel.DataAnnotations;

namespace Backend.Modules;

public class BaseModule
{
    [Key]
    public int Id { get; set; }
}