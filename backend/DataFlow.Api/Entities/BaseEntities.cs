namespace DataFlow.Api.Entities
{
    public class BaseOutputEntity
    {
        public int returnCode { get; set; } = 0;
        public string returnMessage { get; set; } = string.Empty;
    }

}