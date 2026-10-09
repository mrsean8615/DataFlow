using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using DataFlow.Api.Entities;
using DataFlow.Api.DAL;

namespace DataFlow.Api.Helpers
{
    public class Logger
    {
        private readonly DataFlowContext _dbContext;

        public Logger(DataFlowContext context)
        {
            _dbContext = context;
        }

        public async Task LogEventAsync(EventLog eventLog)
        {
            var eventTypeParameter = new SqlParameter("@EventType", eventLog.eventType);
            var eventDataParameter = new SqlParameter("@EventData", eventLog.eventData?.ToString() ?? string.Empty);
            var eventClassParameter = new SqlParameter("@ClassName", eventLog.className ?? string.Empty);
            var eventMethodParameter = new SqlParameter("@MethodName", eventLog.methodName ?? string.Empty);

            await _dbContext.Database.ExecuteSqlRawAsync(
                "EXEC InsertEventLog @EventType, @EventData, @ClassName, @MethodName",
                eventTypeParameter,
                eventDataParameter,
                eventClassParameter,
                eventMethodParameter
            );
        }
    }
}