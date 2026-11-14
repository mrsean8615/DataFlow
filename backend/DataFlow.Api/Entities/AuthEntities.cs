namespace DataFlow.Api.Entities;
using System.ComponentModel.DataAnnotations.Schema;

public class LoginInput
{
    public string email { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
}

public class LoginOutput
{
    public int returnCode { get; set; } = 0;
    public string returnMessage { get; set; } = string.Empty;
    public string token { get; set; } = string.Empty;

    public int id { get; set; }
    public string firstName { get; set; } = string.Empty;
    public string lastName { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string role { get; set; } = string.Empty;
}

public class User
{
    public int id { get; set; }
    public string firstName { get; set; } = string.Empty;
    public string lastName { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string role { get; set; } = string.Empty;
}
public class GetUsersOutput
{
    public int returnCode { get; set; } = 0;
    public string returnMessage { get; set; } = string.Empty;
    public string usersJson { get; set; } = "[]";
    [NotMapped]
    public List<User> users { get; set; } = new List<User>();
}

public class GetUsersInput
{
    public int requester { get; set; }
}

public class CreateUserInput
{
    public int requester { get; set; }
    public string firstName { get; set; } = string.Empty;
    public string lastName { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string role { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
}