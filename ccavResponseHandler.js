const ccav = require("./ccavutil.js");
const qs = require("querystring");

exports.postRes = function (request, response) {
  var ccavEncResponse = "",
    ccavResponse = "",
    workingKey = "762A60A5EF9F85C388AC5C81268F732E",
    ccavPOST = "";

  request.on("data", function (data) {
    ccavEncResponse += data;
    ccavPOST = qs.parse(ccavEncResponse);
    var encryption = ccavPOST.encResp;
    ccavResponse = ccav.decrypt(encryption, workingKey);
  });

  request.on("end", function () {
    const keyValuePairs = ccavResponse.split("&");
    var result = {};
    for (const pair of keyValuePairs) {
      const [key, value] = pair.split("=");
      result[key] = value;
    }
    response.status(200).send(result);
    response.end();
  });
};
