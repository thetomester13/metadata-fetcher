const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.handler = (event, context, callback) => {
    if (!event.queryStringParameters || !event.queryStringParameters.url) {
      callback(null, {
        statusCode: 400, 
        body: JSON.stringify({ errorMsg : "URL parameter required" })
      });
    } else {
      var url = event.queryStringParameters.url;
      if (url.indexOf("https://") === -1 && url.indexOf("http://") === -1) {
        url = "http://" + url;
      }

      JSDOM.fromURL(url).then(dom => {
        var title = dom.window.document.title;

        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ title, url })
        });
      }, function(err) {
        callback(null, {
          statusCode: 400, 
          body: JSON.stringify({ errorMsg : "Couldn't fetch web site :(" })
        });
      });
    }
};