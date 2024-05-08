using Abp.Application.Services;
using Boxfusion.HowTo.Services.PortfolioAppService.Dtos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Boxfusion.HowTo.Services.PortfolioAppService
{
    public interface IPortfolioAppService : IAsyncCrudAppService<PortfolioDto, Guid>
    {
        // we should be able to handle file uploads for multiple file types and files in one request
        Task<List<PortfolioDto>> UploadFilesAsync(IFormFileCollection Files);
        Task<List<Domain.Portfolio>> GetMyPortfolio();

    }
}
