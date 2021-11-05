require("dotenv").config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const httpProxy = require('http-proxy');
const fs = require("fs");
const key = fs.readFileSync(__dirname+'/certs/server.key', 'utf8')
const cert = fs.readFileSync(__dirname+'/certs/server.crt', 'utf8')
const caBundle = fs.readFileSync(__dirname+'/certs/server.ca-bundle', 'utf8')
const ca = caBundle.split('-----END CERTIFICATE-----\n') .map((cert) => cert +'-----END CERTIFICATE-----\n')
/* ca.pop() */
httpProxy.createServer({
    target: {
      host: 'localhost',
      port: 3000
    }
}).listen(HTTP_PORT);
  
httpProxy.createServer({
    target: {
      host: 'localhost',
      port: 3000
    },
    ssl: {cert,key,ca}
}).listen(HTTPS_PORT);
  