using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.BankDetail.Dtos;


namespace Boxfusion.HowTo.Services.BankDetail
{
    public interface IBankDetailAppService : IAsyncCrudAppService<BankDetailDto, Guid>
    {
    }
}
