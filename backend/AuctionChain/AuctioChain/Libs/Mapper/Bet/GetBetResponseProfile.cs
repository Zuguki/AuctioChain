using AuctioChain.Controllers.Bet.Dto;
using AuctioChain.DAL.Models;
using AutoMapper;

namespace AuctioChain.Libs.Mapper.Bet;

public class GetBetResponseProfile : Profile
{
    public GetBetResponseProfile()
    {
        CreateMap<BetResponse, BetDal>()
            .ForMember(nameof(BetDal.Id), cfg => cfg.MapFrom(src => src.Id))
            .ForMember(nameof(BetDal.LotId), cfg => cfg.MapFrom(src => src.LotId))
            .ForMember(nameof(BetDal.UserId), cfg => cfg.MapFrom(src => src.UserId))
            .ReverseMap();
    }
}