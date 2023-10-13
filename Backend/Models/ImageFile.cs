namespace Models;

public class ImageFile
{
    public int ImageFileId { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public string? ImagePaths { get; set; }
}