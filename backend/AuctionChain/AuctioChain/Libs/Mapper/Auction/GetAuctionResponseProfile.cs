using AuctioChain.Controllers.Auction.Dto;
using AutoMapper;

namespace AuctioChain.Libs.Mapper.Auction;

public class GetAuctionResponseProfile : Profile
{
    public GetAuctionResponseProfile()
    {
        CreateMap<GetAuctionResponse, DAL.Models.Auction>().ReverseMap();
    }
}