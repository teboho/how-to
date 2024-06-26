﻿using System.Threading.Tasks;
using Boxfusion.HowTo.Models.TokenAuth;
using Boxfusion.HowTo.Web.Controllers;
using Shouldly;
using Xunit;

namespace Boxfusion.HowTo.Web.Tests.Controllers
{
    public class HomeController_Tests: HowToWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}