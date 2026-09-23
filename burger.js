const http = require("http");
const fs = require("fs/promises");

class Burger {
    constructor() {
        this.server = http.createServer();
        this.urlMethodPathMap = {}
        this.maxRequestSize = 100000  // 100KB
        this.middlewares = [];

        this.server.on("request", (req, res) => {
            req.body = "";
            req.on("data", (chunk) => {
                if (req.body.length >= this.maxRequestSize) {
                    res.status(413).json({message: `Body is more than ${this.maxRequestSize} bytes`});
                    return res.destroy();
                }
                req.body += chunk.toString();
            })
            req.on("end", () => {
                const runMiddleware = (req, res, middleware, index) => {
                    if (index === this.middlewares.length) {
                        const callback = this.urlMethodPathMap[req.method]?.[req.url];
        
                        if (!callback) {
                            res.status(404).json({
                                message: "Route doesn't exist."
                            });
                            return res.end();
                        }
                        callback(req, res);
                        return;
                    }
                    middleware[index](req, res, () => {
                        runMiddleware(req, res, middleware, index + 1);
                    })
                }
                
                runMiddleware(req, res, this.middlewares, 0);
            })
            res.sendFile = async function (path, mime) {
                let fileHandle;
                try {
                    fileHandle = await fs.open(path, "r");
                } catch (error) {
                    res.status(404);
                    return res.end();
                }
                const fileStream = fileHandle.createReadStream();
                res.setHeader("Content-Type", mime);
                res.status(200);
                fileStream.pipe(res);
            }

            res.status = function (statusCode) {
                this.statusCode = statusCode;
                return this;
            }

            res.setContentType = function (type) {
                this.setHeader("Content-Type", type);
                return this;
            }

            res.json = function (messageObj) {
                res.setContentType("application/json");
                res.end(JSON.stringify(messageObj));
            }

            res.setCookie = function (value) {
                res.setHeader("Set-Cookie", value);
                return res;
            }
        })
    }

    beforeEach(cb) {
        this.middlewares.push(cb);
    }

    listen (port, cb){
        this.server.listen(port, () => {
            cb();
        })
    }

    route(method, urlPath, cb) {
        if (typeof cb !== "function") {
            throw new Error("The route method expects the third argument to be a function.");
        }
        method = method.toUpperCase();
        if (!this.urlMethodPathMap[method]) {
            this.urlMethodPathMap[method] = {};
        }
        this.urlMethodPathMap[method][urlPath] = cb;
    }
}


http.ServerResponse.prototype.send = function(body) {
    this.end(body);
}



module.exports = Burger;
