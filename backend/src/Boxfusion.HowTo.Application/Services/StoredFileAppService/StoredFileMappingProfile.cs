using Boxfusion.HowTo.Domain;
using Boxfusion.HowTo.Services.StoredFileAppService.Dtos;

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
