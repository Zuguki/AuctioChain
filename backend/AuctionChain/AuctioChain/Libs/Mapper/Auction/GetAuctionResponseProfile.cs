using AuctioChain.Controllers.Auction.Dto;
using AuctioChain.DAL.Models;
using AutoMapper;

namespace AuctioChain.Libs.Mapper.Auction;

public class GetAuctionResponseProfile : Profile
{
    public GetAuctionResponseProfile()
    {
        CreateMap<CancelAuctionRequest, AuctionDal>().ReverseMap();
        CreateMap<ChangeAuctionCreationStateRequest, AuctionDal>().ReverseMap();
        CreateMap<CreateAuctionRequest, AuctionDal>().ReverseMap();
        CreateMap<DeleteAuctionRequest, AuctionDal>().ReverseMap();
        CreateMap<GetAuctionByIdRequest, AuctionDal>().ReverseMap();
        CreateMap<GetAuctionByIdResponse, AuctionDal>().ReverseMap();
        CreateMap<AuctionDal, AuctionsResponse>()
            .ForMember(nameof(AuctionsResponse.LotsCount), cfg => cfg.MapFrom(src => src.Lots!.Count));
        CreateMap<UpdateAuctionRequest, AuctionDal>()
            .ForMember(nameof(AuctionDal.Id), cfg => cfg.MapFrom(src => src.AuctionId))
            .ReverseMap();
    }
}