using System;
using AuctioChain.DAL.EF.Entities;
using AuctioChain.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AuctioChain.DAL.EF;

/// <inheritdoc />
public sealed class DataContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public DbSet<AuctionDal> Auctions { get; set; } = null!;
    public DbSet<Lot> Lots { get; set; } = null!;
    public DbSet<Bet> Bets { get; set; } = null!;
    public DbSet<Author> Authors { get; set; } = null!;

    private readonly IConfiguration _configuration;

    /// <summary>
    /// .ctor
    /// </summary>
    public DataContext(IConfiguration configuration)
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