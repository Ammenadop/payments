const ccav = require("./ccavutil.js");
const qs = require("querystring");
var CryptoJS = require("crypto-js");
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
    var payResponse = CryptoJS.AES.encrypt(JSON.stringify(result), 'shella@1234BriGu').toString();
    let formbody =
      `<form id="nonseamless" method="post" name="redirect" action="https://www.respirithealth.com/response/${encodeURIComponent(payResponse)}">
      <script language="javascript">document.redirect.submit();</script>
      </form>`;
      response.writeHeader(200, { "Content-Type": "text/html" });
      response.write(formbody);
      response.end();
  });
};
