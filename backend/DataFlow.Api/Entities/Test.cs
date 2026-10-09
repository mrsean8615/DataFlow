using System.ComponentModel.DataAnnotations.Schema;

namespace DataFlow.Api.Entities;

[NotMapped]
public class Test {
    public string? message { get; set; }
}