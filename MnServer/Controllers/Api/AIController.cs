using Microsoft.AspNetCore.Mvc;
using MnServer.Constant;
using MnServer.Service;

namespace MnServer.Controllers.Api
{
    [Route("ai")]
    public class AIController : Controller
    {
        public class RequestModel
        {
            public string Data { get; set; }
            public bool CheckAll { get; set; } = true;
        }

        [HttpPost("check", Name = "check")]
        public async Task<IActionResult> Generate([FromBody] RequestModel request)
        {
            var geminiService = new Service.GeminiService();
            string content = "";
            if (request.CheckAll) {
                content = ServiceConstant.AIConstant.Prompt.CheckAllContent(request.Data);
            } else
            {
                content = ServiceConstant.AIConstant.Prompt.CheckLine(request.Data);
            }
            var result = await geminiService.GenerateText(content);
            return Ok(result);
        }
    }
}
