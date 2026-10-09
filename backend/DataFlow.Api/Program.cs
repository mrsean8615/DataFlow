using DataFlow.Api.Repositories;
using DataFlow.Api.Logic;
using DataFlow.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using DataFlow.Api.DAL;
using DataFlow.Api.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Database
builder.Services.AddDbContext<DataFlowContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DataFlow")
    ));

// Logic
builder.Services.AddScoped<ITestLogic, TestLogic>();
builder.Services.AddScoped<IInventoryLogic, InventoryLogic>();

// DAL
builder.Services.AddScoped<ITestRepository, TestSQL>();
builder.Services.AddScoped<IInventoryRepository, InventorySQL>();

// OpenAPI
builder.Services.AddOpenApi();

// Helpers
builder.Services.AddScoped<Logger>();


var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();