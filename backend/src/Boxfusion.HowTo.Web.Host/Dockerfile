FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/Boxfusion.HowTo.Web.Host/Boxfusion.HowTo.Web.Host.csproj", "src/Boxfusion.HowTo.Web.Host/"]
COPY ["src/Boxfusion.HowTo.Web.Core/Boxfusion.HowTo.Web.Core.csproj", "src/Boxfusion.HowTo.Web.Core/"]
COPY ["src/Boxfusion.HowTo.Application/Boxfusion.HowTo.Application.csproj", "src/Boxfusion.HowTo.Application/"]
COPY ["src/Boxfusion.HowTo.Core/Boxfusion.HowTo.Core.csproj", "src/Boxfusion.HowTo.Core/"]
COPY ["src/Boxfusion.HowTo.EntityFrameworkCore/Boxfusion.HowTo.EntityFrameworkCore.csproj", "src/Boxfusion.HowTo.EntityFrameworkCore/"]
WORKDIR "/src/src/Boxfusion.HowTo.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/Boxfusion.HowTo.Web.Host", "src/Boxfusion.HowTo.Web.Host"]
COPY ["src/Boxfusion.HowTo.Web.Core", "src/Boxfusion.HowTo.Web.Core"]
COPY ["src/Boxfusion.HowTo.Application", "src/Boxfusion.HowTo.Application"]
COPY ["src/Boxfusion.HowTo.Core", "src/Boxfusion.HowTo.Core"]
COPY ["src/Boxfusion.HowTo.EntityFrameworkCore", "src/Boxfusion.HowTo.EntityFrameworkCore"]
WORKDIR "/src/src/Boxfusion.HowTo.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "Boxfusion.HowTo.Web.Host.dll"]
