using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.StoredFileAppService.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.HowTo.Services.StoredFileAppService
{
    public class StoredFileMappingProfile : AutoMapper.Profile
    {
        public StoredFileMappingProfile() 
        {
            CreateMap<StoredFileDto, StoredFile>()
                .ForMember(member => member.Id, action => action.Ignore());
        }
    }
}
