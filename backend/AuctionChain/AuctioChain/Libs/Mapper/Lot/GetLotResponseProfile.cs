<<<<<<< HEAD
﻿using AuctioChain.Controllers.PageLot.Dto;
=======
﻿using System.Linq;
using AuctioChain.Controllers.Lot.Dto;
>>>>>>> develop
using AuctioChain.DAL.Models;
using AutoMapper;

namespace AuctioChain.Libs.Mapper.PageLot;

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