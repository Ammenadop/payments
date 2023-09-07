const ccav = require("./ccavutil.js");

exports.postReq = function (request, response) {
  var body = "",
    workingKey = "762A60A5EF9F85C388AC5C81268F732E",
    accessCode = "AVJA00KH54BN86AJNB",
    formbody = "",
    encRequest = "";
  request.on("data", function (data) {
    body += data;
    encRequest = ccav.encrypt(body, workingKey);
    let payment = encRequest;
    formbody =
      `<form id="nonseamless" method="post" name="redirect" action="https://www.respirithealth.com/pay/${payment}"/> <input type="hidden" id="encRequest" name="encRequest" value="' +
      encRequest +
      '"><input type="hidden" name="access_code" id="access_code" value="' +
      accessCode +
      '"><script language="javascript">document.redirect.submit();</script></form>`;
  });

  request.on("end", function () {
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(formbody);
    response.end();
  });
  return;
};
