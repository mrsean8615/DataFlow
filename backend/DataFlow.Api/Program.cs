
using System.Text;
using DataFlow.Api.Repositories;
using DataFlow.Api.Logic;
using DataFlow.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using DataFlow.Api.DAL;
using DataFlow.Api.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

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
builder.Services.AddScoped<IAuthLogic, AuthLogic>();

// DAL
builder.Services.AddScoped<ITestRepository, TestSQL>();
builder.Services.AddScoped<IInventoryRepository, InventorySQL>();
builder.Services.AddScoped<IAuthRepository, AuthSQL>();

// Helpers
builder.Services.AddScoped<Logger>();
builder.Services.AddScoped<JwtService>();

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT key is missing.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],

            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],

            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            ),

            ClockSkew = TimeSpan.FromMinutes(1)
        };
    });

// Authorization - Require authentication by default
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

// OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
