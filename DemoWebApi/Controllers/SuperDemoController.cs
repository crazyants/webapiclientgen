﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using System.IO;

namespace DemoWebApi.Controllers
{
    /// <summary>
    /// For testing different commbinations of parameters and returns
    /// </summary>
    [RoutePrefix("api/SuperDemo")]
    public class SuperDemoController : ApiController
    {
        [HttpGet]
        [Route("int")]
        public async Task<int> GetIntSquareAsync(int d)//some shops might have strict style guid to name async function with Async suffix always.
        {
            return await Task.Run(() =>  d * d);
        }

        [HttpGet]
        [Route("decimal")]
        public async Task<decimal> GetDecimalSquare(decimal d)
        {
            return await Task.Run(() => d * d);
        }

        [HttpGet]
        [Route("NullableDatetime")]
        public async Task<DateTime?> GetDateTime(bool hasValue)
        {
            return await Task.Run(() =>
            {
                DateTime? dt;
                if (hasValue)
                    dt = DateTime.Now;
                else
                    dt = null;

                return dt;
            });
        }

        [HttpGet]
        [Route("NullableDecimal")]
        public async Task<Decimal?> GetNullableDecimal(bool hasValue)
        {
            return await Task.Run(() =>
            {
                Decimal? dt;
                if (hasValue)
                    dt = 1000;
                else
                    dt = null;

                return dt;
            });
        }

        [HttpGet]
        [Route("FloatZero")]
        public float GetFloatZero()
        {
            return 0.1f + 0.2f - 0.3f;
        }

        [HttpGet]
        [Route("DoubleZero")]
        public double GetDoubleZero()
        {
            return 0.1d + 0.2d - 0.3d;
        }

        [HttpGet]
        [Route("DecimalZero")]
        public decimal GetDecimalZero()
        {
            return 0.1m + 0.2m - 0.3m;
        }

        [HttpGet]
        [Route("NullString")]
        public string GetNullString()
        {
            return null;
        }

        [HttpGet]
        [Route("EmptyString")]
        public string GetEmptyString()
        {
            return String.Empty;
        }

        [HttpGet]
        [Route("NullObject")]
        public DemoData.Person GetNullPerson()
        {
            return null;
        }

        [HttpGet]
        [Route("TextStream")]
        public HttpResponseMessage GetTextStream()
        {
            var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes("abcdefg"));
            {
                var content = new StreamContent(stream);
                content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content=content
                };
            }
        }

        [HttpGet]
        [Route("ByteArray")]
        public byte[] GetByteArray()
        {
            return System.Text.Encoding.UTF8.GetBytes("abcdefg");
        }

        [HttpGet]
        [Route("ActionResult")]
        public IHttpActionResult GetActionResult()
        {
            return Ok("abcdefg");
        }


        [HttpGet]
        [Route("byte")]
        public byte Getbyte()
        {  
            return 255;
        }

        [HttpGet]
        [Route("sbyte")]
        public sbyte Getsbyte()
        {
            return -127;
        }

        [HttpGet]
        [Route("short")]
        public short GetShort()
        {
            return -32768;
        }

        [HttpGet]
        [Route("ushort")]
        public ushort GetUShort()
        {
            return 65535;
        }

        [HttpGet]
        [Route("uint")]
        public uint GetUint()
        {
            return 4294967295;
        }

        [HttpGet]
        [Route("ulong")]
        public ulong Getulong()
        {
            return 18446744073709551615;
        }

        [HttpGet]
        [Route("doulbe")]
        public double Getdouble()
        {
            return -1.7976931348623e308;
        }

        [HttpGet]
        [Route("decimal")]
        public decimal GetDecimal()
        {
            return decimal.MaxValue;
        }

        [HttpGet]
        [Route("char")]
        public char GetChar()
        {
            return 'A';
        }

        [HttpGet]
        [Route("bool")]
        public bool GetBool()
        {
            return true;
        }


    }
}