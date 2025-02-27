namespace MnServer.Constant
{
    public static class StatusMessage
    {
        public const int OK = 200;
        public const int Created = 201;
        public const int NoContent = 204;
        public const int BadRequest = 400;
        public const int Unauthorized = 401;
        public const int Forbidden = 403;
        public const int NotFound = 404;
        public const int MethodNotAllowed = 405;
        public const int RequestTimeout = 408;
        public const int Conflict = 409;
        public const int InternalServerError = 500;
        public const int NotImplemented = 501;
        public const int BadGateway = 502;
        public const int ServiceUnavailable = 503;
        public const int GatewayTimeout = 504;

        public static class Message
        {
            public static string NotFoundMessage(string message) => $"Không tìm thấy {message}";

        }
        public static class ServiceResult
        {
            public static string NotFound(string message) => $"Không tìm thấy {message}";
            public static string BadRequest(string message) => $"Yêu cầu không hợp lệ: {message}";
            public static string InternalServerError(string message) => $"Lỗi hệ thống: {message}";
        }
    }
}
