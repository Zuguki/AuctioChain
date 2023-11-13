using AuctioChain.DAL.Models;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Auction.Dto;
using AutoMapper;

namespace AuctioChain.Libs.Mapper.Auction;

public class GetAuctionResponseProfile : Profile
{
    public GetAuctionResponseProfile()
    {
        CreateMap<CreateAuctionRequest, AuctionDal>().ReverseMap();
        CreateMap<GetAuctionByIdResponse, AuctionDal>().ReverseMap();
        CreateMap<AuctionDal, AuctionResponse>()
            .ForMember(nameof(AuctionResponse.LotsCount), cfg => cfg.MapFrom(src => src.Lots!.Count));
        CreateMap<UpdateAuctionRequest, AuctionDal>()
            .ForMember(nameof(AuctionDal.Id), cfg => cfg.MapFrom(src => src.AuctionId))
            .ReverseMap();
    }
}