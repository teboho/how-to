using Microsoft.AspNetCore.Http;

namespace Boxfusion.HowTo.Utils
{
    public class Utils
    {
        public static bool IsImage(IFormFile file)
        {
            var test = (file.ContentType.ToLower() != "image/jpg" ||
                    file.ContentType.ToLower() != "image/jpeg" ||
                    file.ContentType.ToLower() != "image/pjpeg" ||
                    file.ContentType.ToLower() != "image/gif" ||
                    file.ContentType.ToLower() != "image/x-png");
            return test;
        }

        public static bool IsPdf(IFormFile file)
        {
            var test = (file.ContentType.ToLower() != "application/pdf");
            return test;
        }

        public static bool IsWord(IFormFile file)
        {
            var test = (file.ContentType.ToLower() != "application/msword" ||
                        file.ContentType.ToLower() != "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            );
            return test;
        }

        public static bool IsVideo(IFormFile file)
        {
            var test = (file.ContentType.ToLower() != "video/mp4" ||
                        file.ContentType.ToLower() != "video/ogg" ||
                        file.ContentType.ToLower() != "video/webm" ||
                        file.ContentType.ToLower() != "video/3gpp" ||
                        file.ContentType.ToLower() != "video/mkv"
            );
            return test;
        }
    }
}
