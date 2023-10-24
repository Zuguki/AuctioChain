using AuctioChain.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AuctioChain.DAL.EF;

/// <inheritdoc />
public sealed class ApplicationDbContext : DbContext
{
    public DbSet<Auction> Auctions{ get; set; } = null!;
    public DbSet<Lot> Lots { get; set; } = null!;
    public DbSet<Bet> Bets { get; set; } = null!;
    public DbSet<Author> Authors { get; set; } = null!;

    private readonly IConfiguration _configuration;

    /// <summary>
    /// .ctor
    /// </summary>
    public ApplicationDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
        Database.EnsureCreated();
    }

    /// <inheritdoc />
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Postgres"));
    }
}