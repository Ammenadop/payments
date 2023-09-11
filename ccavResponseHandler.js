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
    let rn = new Date().getTime() + Math.floor(Math.random() * 899999 + 100000);
    rn = String(rn).slice(0, 6);
    var ip = `${result.order_id}${rn}pay${result.order_status}`;
    let encrypted = CryptoJS.AES.encrypt(ip, "shella@1234BriHakku").toString()
    var payResponse = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex);
    let formbody = `<form id="nonseamless" method="post" name="redirect" action="https://www.respirithealth.com/response/${payResponse}">
      <script language="javascript">document.redirect.submit();</script>
      </form>`;
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(formbody);
    response.end();
  });
};
