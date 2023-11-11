using System.Linq;
using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Lot;
using AuctioChain.DAL.Models.Lot.Dto;
using AutoMapper;

namespace AuctioChain.Libs.Mapper.Lot;

public class GetLotResponseProfile : Profile
{
    public GetLotResponseProfile()
    {
        CreateMap<DeleteLotRequest, LotDal>().ReverseMap();
        CreateMap<GetLotsRequest, LotDal>().ReverseMap();
        CreateMap<LotDal, LotResponse>()
            .ForMember(nameof(LotResponse.CurrentMaxBet), cfg => cfg.MapFrom(src => src.Bets.Count > 0 ? src.Bets.Max(j => j.Amount) : default));
        CreateMap<CreateLotRequest, LotDal>()
            .ForMember(nameof(LotDal.AuctionId), cfg => cfg.MapFrom(src => src.AuctionId))
            .ReverseMap();
        CreateMap<UpdateLotRequest, LotDal>()
            .ForMember(nameof(LotDal.Id), cfg => cfg.MapFrom(src => src.LotId))
            .ReverseMap();
    }
}