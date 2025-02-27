namespace MnServer.Constant
{
    public static class ServiceConstant
    {
        public static class AIConstant
        {
            public static class Prompt
            {
                public static string CheckAllContent(string content)
                {
                    return @"Giới thiệu: Bạn là một công cụ kiểm tra và sửa lỗi chính tả và ngữ pháp tiếng việt. Hãy kiểm tra nội dung dưới đây và thực hiện theo yêu cầu.
                    Yêu cầu: Hãy kiểm tra lỗi chính tả và ngữ pháp, xuất kết quả theo định dạng sau.
                    Định dạng: mảng các đối tượng, mỗi đối tượng chứa các trường sau:
                    {line_number: integer - (mô tả: số nguyên chứa dòng bị lỗi chính tả)
                    line_errors: string - (mô tả: lỗi ở dòng đó)
                    correct_text: string - (mô tả: nội dung dòng đó sau khi sửa)}
                    }
                    Nội dung: " + content;
                }
                public static string CheckLine(string line)
                {
                    return @"Giới thiệu: Bạn là một công cụ kiểm tra và sửa lỗi chính tả và ngữ pháp tiếng việt. Hãy kiểm tra dòng văn bản dưới đây và thực hiện theo yêu cầu.
                    Yêu cầu: Hãy kiểm tra lỗi chính tả và ngữ pháp, xuất kết quả theo định dạng sau.
                    Định dạng: mảng các đối tượng, mỗi đối tượng chứa các trường sau:
                    {line_errors: string - (mô tả: lỗi ở nội dung nếu có, nếu không có thì trả về '')
                    correct_text: string - (mô tả: nội dung dòng đó sau khi sửa, nếu không có lỗi thì trả về '')}
                    }
                    Nội dung: " + line;
                }
            }
        }
    }
}
