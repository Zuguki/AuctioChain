using Nethereum.ABI.FunctionEncoding.Attributes;

namespace AuctioChain.BL.Balance.Blockchain.Dto;

[FunctionOutput]
public class GetUserBalanceOfOutputDTO : IFunctionOutputDTO
{
	[Parameter("uint", "balance", 1)] 
	public long Balance { get; set; }
}
