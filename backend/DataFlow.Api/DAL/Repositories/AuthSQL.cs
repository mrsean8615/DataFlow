using Microsoft.EntityFrameworkCore;
using DataFlow.Api.Entities;
using DataFlow.Api.Interfaces;
using DataFlow.Api.DAL;
using DataFlow.Api.Helpers;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Text.Json;

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

    public async Task<GetUserByEmailOutput> GetUserByEmail(string email)
    {
        try
        {
            var connection = _context.Database.GetDbConnection();

            await using var command = connection.CreateCommand();

            command.CommandText = "dbo.GetUserByEmail";
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add(
                CreateParameter(command, "@Email", email)
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

            return new GetUserByEmailOutput
            {
                returnCode = Convert.ToInt32(reader["returnCode"]),
                returnMessage = reader["returnMessage"]?.ToString() ?? "",
                id = Convert.ToInt32(reader["id"]),
                firstName = reader["firstName"]?.ToString() ?? "",
                lastName = reader["lastName"]?.ToString() ?? "",
                email = reader["email"]?.ToString() ?? "",
                role = reader["role"]?.ToString() ?? "",
                passwordHash = reader["passwordHash"]?.ToString() ?? ""
            };
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(AuthSQL),
                methodName = nameof(GetUserByEmail),
                eventData = ex
            });

            throw;
        }
    }
    public async Task<GetUsersOutput> GetUsers(GetUsersInput input)
    {
        GetUsersOutput result = new GetUsersOutput();
        try
        {
            var output = await _context.Set<GetUsersOutput>()
                .FromSqlRaw(
                    "EXEC GetUsers @requester",
                    new SqlParameter("@requester", input.requester)
                )
                .ToListAsync();

            result = output.FirstOrDefault() ?? new GetUsersOutput();

            if (result.returnCode == 0)
            {
                result.users = JsonSerializer.Deserialize<List<User>>(
                    result.usersJson,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    }
                ) ?? new List<User>();
            }

            return result;
        }
        catch (Exception ex)
        {
            result.returnCode = 1;
            result.returnMessage = ex.Message;
            return result;
        }
    }

    public async Task<BaseOutputEntity> CreateUser(CreateUserInput input)
    {
        Console.WriteLine($"Controller requester: {input}");
        try
        {
            var result = await _context.Set<BaseOutputEntity>()
                .FromSqlRaw(
                    """
                    EXEC dbo.CreateUser
                        @requester = {0},
                        @firstName = {1},
                        @lastName = {2},
                        @email = {3},
                        @role = {4},
                        @password = {5}
                    """,
                    input.requester,
                    input.firstName,
                    input.lastName,
                    input.email,
                    input.role,
                    input.password)
                .ToListAsync();
            return result.First();
        }
        catch (Exception ex)
        {
            await _logger.LogEventAsync(new EventLog
            {
                eventType = "ERROR",
                className = nameof(AuthSQL),
                methodName = nameof(CreateUser),
                eventData = ex
            });

            throw;
        }
    }
        
}