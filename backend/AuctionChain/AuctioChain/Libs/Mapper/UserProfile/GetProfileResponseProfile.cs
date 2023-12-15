using AuctioChain.DAL.Models.Account;
using AuctioChain.DAL.Models.Profile.Dto;

namespace AuctioChain.Libs.Mapper.UserProfile;

public class GetProfileResponseProfile : AutoMapper.Profile
{
    public GetProfileResponseProfile()
    {
        CreateMap<ApplicationUser, GetProfileResponse>()
            .ForMember(nameof(GetProfileResponse.UserName), cfg => cfg.MapFrom(src => src.UserName));
    }
}