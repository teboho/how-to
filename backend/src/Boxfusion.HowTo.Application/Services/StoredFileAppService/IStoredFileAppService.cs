using Abp.Application.Services;
using Boxfusion.HowTo.Services.StoredFileAppService.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.StoredFileAppService
{
    public interface IStoredFileAppService : IApplicationService
    {
        Task<Domain.StoredFile> CreateStoredFile(StoredFileDto input);

        Task<IActionResult> UpdateStoredFile(Guid id, [FromForm] StoredFileDto input);

        Task<IActionResult> GetStoredFile(Guid id);

        Task<List<StoredFileDto>> GetAllFiles();
    }
}
