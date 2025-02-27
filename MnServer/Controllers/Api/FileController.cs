using Microsoft.AspNetCore.Mvc;
using MnServer.Constant;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.VariantTypes;

namespace MnServer.Controllers.Api
{
    [Route("comic")]
    public class FileController : Controller
    {
        [HttpGet("dirs", Name = "dirs")]
        public IActionResult Get(string path)
        {
            if (Directory.Exists(path))
            {
                string[] directories = Directory.GetDirectories(path);
                string[] files = Directory.GetFiles(path);
                return Ok(directories.Concat(files).ToArray());
            }
            else
            {
                return NotFound(StatusMessage.Message.NotFoundMessage($"đường dẫn {path}"));
            }
        }

        [HttpGet("file", Name = "file")]
        public IActionResult GetFile(string path)
        {
            if (System.IO.File.Exists(path))
            {
                using(WordprocessingDocument wordDocument = WordprocessingDocument.Open(path, false))
                {
                    Body body = wordDocument.MainDocumentPart.Document.Body;
                    var paras = body.Elements<Paragraph>();
                    List<string> data = new List<string>();
                    foreach (var para in paras)
                    {
                        data.Add(para.InnerText);
                    }
                    return Ok(String.Join("\n", data));
                }
            }
            else
            {
                return NotFound(StatusMessage.Message.NotFoundMessage($"file {path}"));
            }
        }

        [HttpPost("file", Name = "file")]
        public IActionResult PostFile(string content, string savePath)
        {
            if (System.IO.File.Exists(ComicConstant.TEMPLATE))
            {
                try
                {
                    System.IO.File.Copy(ComicConstant.TEMPLATE, savePath);
                    using (WordprocessingDocument wordDocument = WordprocessingDocument.Open(savePath, true))
                    {
                        Body body = wordDocument.MainDocumentPart.Document.Body;
                        foreach (var paragraph in body.Elements<Paragraph>())
                        {
                            foreach (var run in paragraph.Elements<Run>())
                            {
                                foreach (var text in run.Elements<Text>())
                                {
                                    if (text.Text.Contains("{{content}}"))
                                    {
                                        text.Text = text.Text.Replace("{{content}}", content);
                                    }
                                }
                            }
                        }
                        wordDocument.MainDocumentPart.Document.Save();
                        return Ok($"Đã lưu tệp mới: {savePath}");
                    }
                }
                catch (Exception e)
                {
                    // delete file
                    System.IO.File.Delete(savePath);
                }
            }
            return NotFound(StatusMessage.Message.NotFoundMessage($"file {ComicConstant.TEMPLATE}"));
        }
    }
}