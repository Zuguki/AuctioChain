using AuctioChain.Controllers.Lot.Dto;
using AuctioChain.DAL.Models;
using AutoMapper;

namespace AuctioChain.Libs.Mapper.Lot;

public class GetLotResponseProfile : Profile
{
    public GetLotResponseProfile()
    {
        CreateMap<DeleteLotRequest, LotDal>().ReverseMap();
        CreateMap<GetLotsRequest, LotDal>().ReverseMap();
        CreateMap<CreateLotRequest, LotDal>()
            .ForMember(nameof(LotDal.AuctionId), cfg => cfg.MapFrom(src => src.AuctionId))
            .ReverseMap();
        CreateMap<UpdateLotRequest, LotDal>()
            .ForMember(nameof(LotDal.Id), cfg => cfg.MapFrom(src => src.LotId))
            .ReverseMap();
    }
}