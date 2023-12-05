using AuctioChain.DAL.Models.Account;
using AuctioChain.DAL.Models.Profile.Dto;
using AutoMapper;

namespace AuctioChain.Libs.Mapper.User;

public class GetUserResponseProfile : Profile
{
    public GetUserResponseProfile()
    {
        CreateMap<ApplicationUser, GetProfileResponse>()
            .ForMember(nameof(GetProfileResponse.UserName), cfg => cfg.MapFrom(src => src.UserName));
    }
}