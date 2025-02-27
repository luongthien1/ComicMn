using System.Text.Json;
using System.Text;
using GenerativeAI;

namespace MnServer.Service
{
    public class GeminiService
    {
        private static readonly string ApiKey = Environment.GetEnvironmentVariable("APIKEY");
        public GeminiService() { }
        public async Task<String> GenerateText(string data)
        {
            using (HttpClient client = new HttpClient())
            {
                var googleAI = new GenerativeAI.GoogleAi(ApiKey);
                var model = googleAI.CreateGenerativeModel(GoogleAIModels.Gemini15Flash);

                var response = await model.GenerateContentAsync(data);
                return response.Text() ?? "";
            }
        }
    }
}
