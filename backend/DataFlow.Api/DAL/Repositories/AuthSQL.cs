using Microsoft.EntityFrameworkCore;
using DataFlow.Api.Entities;
using DataFlow.Api.Interfaces;
using DataFlow.Api.DAL;
using DataFlow.Api.Helpers;
using System.Data;
using Microsoft.Data.SqlClient;

namespace DataFlow.Api.Repositories;

public class AuthSQL : IAuthRepository
{
    private readonly DataFlowContext _context;
    private readonly Logger _logger;

    public AuthSQL(DataFlowContext context, Logger logger)
    {
        _context = context;
        _logger = logger;
    }

    private static IDbDataParameter CreateParameter(
        System.Data.Common.DbCommand command,
        string name,
    object? value)
    {
        var parameter = command.CreateParameter();
        parameter.ParameterName = name;
        parameter.Value = value ?? DBNull.Value;
        return parameter;
    }

public async Task<LoginOutput> Login(LoginInput input)
{
    try
    {
        var connection = _context.Database.GetDbConnection();

        await using var command = connection.CreateCommand();

        command.CommandText = "dbo.Login";
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.Add(
            new SqlParameter("@Email", input.email)
        );

        command.Parameters.Add(
            new SqlParameter("@Password", input.password)
        );

        if (connection.State != ConnectionState.Open)
        {
            await connection.OpenAsync();
        }

        await using var reader = await command.ExecuteReaderAsync();

        if (!await reader.ReadAsync())
        {
            throw new InvalidOperationException(
                "Login procedure returned no result."
            );
        }

        return new LoginOutput
        {
            returnCode = Convert.ToInt32(reader["returnCode"]),
            returnMessage = reader["returnMessage"]?.ToString() ?? "",
            id = Convert.ToInt32(reader["id"]),
            firstName = reader["firstName"]?.ToString() ?? "",
            lastName = reader["lastName"]?.ToString() ?? "",
            email = reader["email"]?.ToString() ?? "",
            role = reader["role"]?.ToString() ?? ""
        };
    }
    catch (Exception ex)
    {
        await _logger.LogEventAsync(new EventLog
        {
            eventType = "ERROR",
            className = nameof(AuthSQL),
            methodName = nameof(Login),
            eventData = ex
        });

        throw;
    }
}
    
}