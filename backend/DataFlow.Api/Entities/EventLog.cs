namespace DataFlow.Api.Entities
{
    public class EventLog
    {
        public string eventType { get; set; } = string.Empty;
        public Exception? eventData { get; set; }
        public string? className { get; set; } = string.Empty;
        public string? methodName { get; set; } = string.Empty;
    }
}