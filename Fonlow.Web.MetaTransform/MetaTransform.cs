﻿using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using Fonlow.DocComment;

namespace Fonlow.Web.Meta
{
    /// <summary>
    /// Transform the runtime info of Web API into POCO meta data.
    /// </summary>
    public static class MetaTransform
    {
        static ParameterBinder GetParameterBinder(ParameterBindingAttribute a)
        {
            if (a == null)
                return ParameterBinder.None;

            if (a is FromUriAttribute)
                return ParameterBinder.FromUri;

            if (a is FromBodyAttribute)
                return ParameterBinder.FromBody;

            throw new ArgumentException($"How can it be with this ParameterBindingAttribute {a.ToString()}", "a");
        }

        public static WebApiDescription GetWebApiDescription(ApiDescription description)
        {
			var xmlFilePath = DocCommentLookup.GetXmlPath(description.ActionDescriptor.ControllerDescriptor.ControllerType.Assembly);
			var docLookup = DocCommentLookup.Create(xmlFilePath);
			var methodComments = docLookup == null ? null : GetMethodDocComment(docLookup, description.ActionDescriptor);
			
			return new WebApiDescription(description.ID)
            {
                ActionDescriptor = new ActionDescriptor()
                {
                    ActionName = description.ActionDescriptor.ActionName,
                    ReturnType = description.ResponseDescription?.ResponseType ?? description.ActionDescriptor.ReturnType,//for complex types
                    ControllerDescriptor = new ControllerDescriptor()
                    {
                        ControllerName = description.ActionDescriptor.ControllerDescriptor.ControllerName,
                        ControllerType = description.ActionDescriptor.ControllerDescriptor.ControllerType,
                    }
                },

                HttpMethod = description.HttpMethod.Method,
                Documentation = DocCommentHelper.GetSummary(methodComments),
				RelativePath = description.RelativePath,
                ResponseDescription = new ResponseDescription()
                {
                    Documentation = DocCommentHelper.GetReturnComment(methodComments),
					ResponseType = description.ResponseDescription.ResponseType,
                    DeclaredType = description.ResponseDescription.DeclaredType,
                },

                ParameterDescriptions = description.ParameterDescriptions.Select(d => new ParameterDescription()
                {
                    Documentation = DocCommentHelper.GetParameterComment(methodComments, d.Name),
					Name = d.Name,
                    ParameterDescriptor = new ParameterDescriptor()
                    {
                        ParameterName = d.ParameterDescriptor.ParameterName,
                        ParameterType = d.ParameterDescriptor.ParameterType,
                        ParameterBinder = GetParameterBinder(d.ParameterDescriptor.ParameterBinderAttribute),

                    }
                }).ToArray(),

            };
        }

		static docMember GetMethodDocComment(DocCommentLookup lookup, System.Web.Http.Controllers.HttpActionDescriptor descriptor)
		{
			var methodFullName = descriptor.ControllerDescriptor.ControllerType.FullName + "." + descriptor.ActionName;
			var parameters = descriptor.GetParameters();
			if (parameters.Count > 0)
			{
				methodFullName += "(" + parameters.Select(d => d.ParameterType.FullName).Aggregate((c, n) => c + "," + n) + ")";
			}

			return lookup.GetMember("M:" + methodFullName);
		}
	}

}
