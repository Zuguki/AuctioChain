using Nethereum.ABI.FunctionEncoding.Attributes;

namespace AuctioChain.MQ.Blockchain.Dto;

[FunctionOutput]
public class GetUserBalanceOfOutputDTO : IFunctionOutputDTO
{
	[Parameter("uint", "result", 1)] 
	public long Result { get; set; }
}
