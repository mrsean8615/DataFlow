namespace DataFlow.Api.Entities;

public class LoginInput
{
    public string email { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
}

public class LoginOutput : BaseOutputEntity
{
    public string token { get; set; } = string.Empty;

    public int id { get; set; }
    public string firstName { get; set; } = string.Empty;
    public string lastName { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string role { get; set; } = string.Empty;
}