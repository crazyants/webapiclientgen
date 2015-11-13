/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../ClientApi/WebApiClientAuto.ts"/>
QUnit.config.testTimeout = 30000;
var entitiesApi = new DemoWebApi_Controllers_Client.Entities('http://localhost:9024/');
var superDemoApi = new DemoWebApi_Controllers_Client.SuperDemo("http://localhost:9024/");
var valuesApi = new DemoWebApi_Controllers_Client.Values("http://localhost:9024/");
QUnit.module("Entities");
QUnit.test("data compare", function (assert) {
    var person = {
        Name: "someone",
        Surname: "my",
        GivenName: "something",
    };
    var person2 = {
        Name: "someone",
        Surname: "my",
        GivenName: "something",
    };
    assert.equal(JSON.stringify(person), JSON.stringify(person2));
});
QUnit.test("GetPerson", function (assert) {
    var done = assert.async();
    entitiesApi.GetPerson(100, function (data) {
        assert.equal(data.Name, "Z Huang");
        done();
    });
});
QUnit.test("AddPerson", function (assert) {
    var done = assert.async();
    entitiesApi.CreatePerson({
        Name: "some body",
        GivenName: "some",
        Surname: "body",
        BirthDate: new Date("1977-08-18"),
        Addresses: [{
                City: "Brisbane",
                State: "QLD",
                Type: DemoWebApi_DemoData_Client.AddressType.Residential
            }]
    }, function (data) {
        assert.ok(data > 0);
        done();
    });
});
QUnit.test("AddPersonExceptionInvokeErrorHandler", function (assert) {
    assert.expect(0);
    var done = assert.async();
    var api = new DemoWebApi_Controllers_Client.Entities('http://localhost:9024/', function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.responseText);
        done();
    });
    api.CreatePerson({
        Name: "Exception",
        GivenName: "some",
        Surname: "body",
    }, function (data) {
        assert.ok(data > 0);
        // done();
    });
});
QUnit.module("SuperDemoTests");
test("JsZeroNotGood", function (assert) {
    assert.notEqual(0.1 + 0.2 - 0.3, 0, "Zero, Zero; equal succeeds");
});
test("JsZeroNotGoodWithFloat", function (assert) {
    var done = assert.async();
    superDemoApi.GetFloatZero(function (data) {
        assert.notEqual(data, 0);
        done();
    });
});
test("JsZeroNotGoodWithDouble", function (assert) {
    var done = assert.async();
    superDemoApi.GetDoubleZero(function (data) {
        assert.notEqual(data, 0);
        done();
    });
});
test("JsZeroGoodWithDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.GetDecimalZero(function (data) {
        assert.equal(data, 0);
        done();
    });
});
test("GetIntSquare", function (assert) {
    var done = assert.async();
    superDemoApi.GetIntSquare(100, function (data) {
        assert.equal(data, 10000);
        done();
    });
});
test("GetDecimalSquare", function (assert) {
    var done = assert.async();
    superDemoApi.GetDecimalSquare(100, function (data) {
        assert.equal(data, 10000);
        done();
    });
});
test("GetDateTime", function (assert) {
    var done = assert.async();
    superDemoApi.GetDateTime(true, function (data) {
        assert.ok(data);
        done();
    });
});
test("GetDateTimeNull", function (assert) {
    var done = assert.async();
    superDemoApi.GetDateTime(false, function (data) {
        assert.ok(data == undefined);
        done();
    });
});
test("GetNullableDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.GetNullableDecimal(true, function (data) {
        assert.ok(data > 10);
        done();
    });
});
test("GetNullableDecimalNull", function (assert) {
    var done = assert.async();
    superDemoApi.GetNullableDecimal(false, function (data) {
        assert.ok(data == undefined);
        done();
    });
});
test("GetNullString", function (assert) {
    var done = assert.async();
    superDemoApi.GetNullString(function (data) {
        assert.ok(data == null);
        done();
    });
});
test("GetNullPerson", function (assert) {
    var done = assert.async();
    superDemoApi.GetNullPerson(function (data) {
        assert.ok(data == null);
        done();
    });
});
test("GetByteArray", function (assert) {
    var done = assert.async();
    superDemoApi.GetByteArray(function (data) {
        assert.ok(data.length > 0);
        done();
    });
});
test("GetTextStream", function (assert) {
    var done = assert.async();
    superDemoApi.GetTextStream(function (data) {
        assert.ok(data);
        done();
    });
});
test("GetActionResult", function (assert) {
    var done = assert.async();
    superDemoApi.GetActionResult(function (data) {
        assert.ok(data);
        done();
    });
});
test("Getbyte", function (assert) {
    var done = assert.async();
    superDemoApi.Getbyte(function (data) {
        assert.equal(data, 255);
        done();
    });
});
test("GetBool", function (assert) {
    var done = assert.async();
    superDemoApi.GetBool(function (data) {
        assert.equal(data, true);
        done();
    });
});
test("Getsbyte", function (assert) {
    var done = assert.async();
    superDemoApi.Getsbyte(function (data) {
        assert.equal(data, -127);
        done();
    });
});
test("GetChar", function (assert) {
    var done = assert.async();
    superDemoApi.GetChar(function (data) {
        assert.equal(data, "A");
        done();
    });
});
test("GetDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.GetDecimal(function (data) {
        assert.equal(data, 79228162514264337593543950335);
        done();
    });
});
test("Getdouble", function (assert) {
    var done = assert.async();
    superDemoApi.Getdouble(function (data) {
        assert.equal(data, -1.7976931348623e308);
        done();
    });
});
test("GetUint", function (assert) {
    var done = assert.async();
    superDemoApi.GetUint(function (data) {
        assert.equal(data, 4294967295);
        done();
    });
});
test("Getulong", function (assert) {
    var done = assert.async();
    superDemoApi.Getulong(function (data) {
        assert.equal(data, 18446744073709551615);
        done();
    });
});
QUnit.module("ValuesTests");
test("Get", function (assert) {
    var done = assert.async();
    valuesApi.Get(function (data) {
        assert.equal(data[1], "value2");
        done();
    });
});
test("GetByIdAndName", function (assert) {
    var done = assert.async();
    valuesApi.GetByIdAndName(1, "something", function (data) {
        assert.equal(data, "something1");
        done();
    });
});
test("PostValue", function (assert) {
    var done = assert.async();
    var api = new DemoWebApi_Controllers_Client.Values('http://localhost:9024/', function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.responseText);
        done();
    });
    var v = { '': 'value' };
    api.Post(v, function (data) {
        assert.equal(data, "VALUE");
        done();
    });
});
test("Put", function (assert) {
    assert.expect(0);
    var done = assert.async();
    var api = new DemoWebApi_Controllers_Client.Values('http://localhost:9024/', function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.responseText);
        done();
    });
    api.Put(1, { '': 'value' }, function (data) {
        done();
    });
});
test("Delete", function (assert) {
    assert.expect(0);
    var done = assert.async();
    var api = new DemoWebApi_Controllers_Client.Values('http://localhost:9024/', function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.responseText);
        done();
    });
    api.Delete(1, function (data) {
        done();
    });
});
//# sourceMappingURL=demo.tests.js.map