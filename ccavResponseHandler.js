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

  request.on('end', function () {
    var pData = '';
    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'	
    pData = pData + ccavResponse.replace(/=/gi,'</td><td>')
    pData = pData.replace(/&/gi,'</td></tr><tr><td>')
    pData = pData + '</td></tr></table>'
          htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>'+ pData +'</center><br></body></html>';
          response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(htmlcode);
    response.end();
}); 
};