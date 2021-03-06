﻿using System;
using System.Web.Mvc;
using mobSocial.WebApi.Enum;

namespace mobSocial.WebApi.Configuration.Security.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class RequireFeatureEnabledAttribute : FilterAttribute, IAuthorizationFilter
    {
        private readonly Features _feature;

        public RequireFeatureEnabledAttribute(Features feature)
        {
            _feature = feature;
        }
        public void OnAuthorization(AuthorizationContext filterContext)
        {
           //check if a particular feature is enabled and return appropriate result if feature is not enabled

        }
    }
}