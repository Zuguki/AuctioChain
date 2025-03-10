using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace AuctioChain.BL.Balance.Blockchain.Functions;

[Function("getUserBalance", "uint")]
public class GetUserBalanceFunction : FunctionMessage
{
	[Parameter("address", "userAddress", 1)]
	public string UserAddress { get; set; }
}