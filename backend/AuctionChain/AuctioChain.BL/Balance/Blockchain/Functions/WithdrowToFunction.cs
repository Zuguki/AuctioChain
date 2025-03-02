using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace AuctioChain.BL.Balance.Blockchain.Functions;

[Function("withdrowTo")]
public class WithdrowToFunction : FunctionMessage
{
	[Parameter("address", "userAddress", 1)]
	public string UserAddress { get; set; }
	
	[Parameter("uint", "value", 1)]
	public long Value { get; set; }
}
