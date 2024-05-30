FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Debug
WORKDIR /src

RUN apt-get update && \
    apt-get install wget postgresql-client --yes && \
    mkdir --parents ~/.postgresql && \
    wget "https://storage.yandexcloud.net/cloud-certs/CA.pem" \
         --output-document ~/.postgresql/root.crt && \
    chmod 0600 ~/.postgresql/root.crt

COPY ["AuctioChain/AuctioChain.csproj", "AuctioChain/"]
COPY ["AuctioChain.BL/AuctioChain.BL.csproj", "AuctioChain.BL/"]
COPY ["AuctioChain.DAL/AuctioChain.DAL.csproj", "AuctioChain.DAL/"]
RUN dotnet restore "AuctioChain/AuctioChain.csproj"
COPY . .
WORKDIR "/src/AuctioChain"
RUN dotnet build "AuctioChain.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Debug
RUN dotnet publish "AuctioChain.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuctioChain.dll"]
