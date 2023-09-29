namespace Models;

public class Product
{
    public int ProductId { get; set; }
    public string? ProductName { get; set; }
    public string? Category { get; set; }
    public float? Price { get; set; }
    public string? SKU { get; set; }
    public string? Description { get; set; }
    public List<Image>? Image { get; set; } = new List<Image>();
    public string? StockStatus { get; set; }
    public string? Payment { get; set; }
}