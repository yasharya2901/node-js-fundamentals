const http = require("http");


class Burger {
    constructor() {
        this.server = http.createServer();

        this.server.on("request", (req, res) => {
            const callback = this.urlMethodPathMap[req.method]?.[req.url];

            if (!callback) {
                res.statusCode = 404;
                return res.end();
            }

            callback(req, res);
        })

        this.urlMethodPathMap = {}
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
        if (!this.urlMethodPathMap[method]) {
            this.urlMethodPathMap[method] = {};
        }
        this.urlMethodPathMap[method][urlPath] = cb;
    }
}

http.ServerResponse.prototype.status = function(statusCode) {
    this.statusCode = statusCode;
    return this;
}

http.ServerResponse.prototype.send = function(body) {
    this.end(body);
}

http.ServerResponse.prototype.setContentType = function(type) {
    this.setHeader("Content-Type", type);
    return this;
}

module.exports = Burger;