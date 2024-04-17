using System.ComponentModel.DataAnnotations;

namespace Boxfusion.HowTo.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}