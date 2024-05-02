using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.PortfolioAppService.Dtos
{
    public class PostPortfolioFilesDto
    {
        public IEnumerable<IFormFile> Files { get; set; }
    }
}
