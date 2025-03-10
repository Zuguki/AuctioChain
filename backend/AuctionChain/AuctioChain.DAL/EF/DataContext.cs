﻿using System;
using System.Collections.Generic;
using AuctioChain.DAL.Models.Account;
using AuctioChain.DAL.Models.Admin.Dto;
using AuctioChain.DAL.Models.Auction;
using AuctioChain.DAL.Models.Bet;
using AuctioChain.DAL.Models.Lot;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AuctioChain.DAL.EF;

/// <inheritdoc />
public sealed class DataContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public DbSet<AuctionDal> Auctions { get; set; } = null!;
    public DbSet<LotDal> Lots { get; set; } = null!;
    public DbSet<BetDal> Bets { get; set; } = null!;
    
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
        var connectionString = _configuration.GetConnectionString("Postgres");
        optionsBuilder.UseNpgsql(connectionString);
    }

    /// <inheritdoc />
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole<Guid>>().HasData(new List<IdentityRole<Guid>>
        {
            new() {Id = Guid.NewGuid(), Name = RoleEnum.Member.ToString(), NormalizedName = RoleEnum.Member.ToString().ToUpper()},
            new() {Id = Guid.NewGuid(), Name = RoleEnum.Moderator.ToString(), NormalizedName = RoleEnum.Moderator.ToString().ToUpper()},
            new() {Id = Guid.NewGuid(), Name = RoleEnum.Administrator.ToString(), NormalizedName = RoleEnum.Administrator.ToString().ToUpper()},
        });
    }
}