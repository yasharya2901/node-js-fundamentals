const Burger = require("../burger");

const server = new Burger();

const PORT = 8000;
const SESSIONS = []; // objects like {userId:1, token: 23434}

const USERS = [
    {id: 1, name: "Yash", username: "yash", password: "password"},
    {id: 2, name: "Sameeksha", username: "sam", password: "password"},
    {id: 3, name: "Aman", username: "aman", password: "password"},
]
const POSTS = [
    {
        id: 1,
        title: "This is a post title",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius cumque asperiores nesciunt, error perspiciatis quia veniam, reprehenderit quasi, ab consectetur non a quae delectus vel. Natus aperiam cupiditate amet officiis.",
        userId: 1,
    },
    {
        id: 2,
        title: "Today's News",
        body: "Today, the justice league falsly believed that the superman was dead but he turned out to be transported to future. It was quite shocking to see Vandal Savage in his most compassionate form. And, the superman looks good without his beard for sure.",
        userId: 2,
    },
]

// TODO: Make this work
server.beforeEach((req, res, next) => {
    const routes = ["/", "/login", "/profile", "new-post"];
    console.log(req.url)
    if (routes.indexOf(req.url) !== -1 && req.method === "GET") {
        return res.status(200).sendFile("./public/index.html", "text/html");
    }

    next();
})

server.beforeEach((req, res, next) => {
    const routesToAuthenticate = [
        "GET /api/user",
        "PUT /api/user",
        "POST /api/posts",
        "DELETE /api/logout"
    ]

    if (routesToAuthenticate.indexOf(req.method + " " + req.url) !== -1) {
        if (!req.headers.cookie) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const cookies = req.headers.cookie.split(";");
        let cookieObj = [];
        cookies.map((cookie) => {
            const keyVal = cookie.split("=");
            const key = keyVal[0];
            const val = keyVal[1];
            cookieObj.push({[key]: val})
        })
    
        const tokenObj = cookieObj.find((obj) => {
            return obj.token;
        })
        
        const session = SESSIONS.find((session) => {
            return session.token == tokenObj.token;
        })
    
        if (!session) {
            return res.status(401).json({message: "Unauthorised"});
        }
    
        req.userId = session.userId;
    } 
    
    next();
    
})


server.beforeEach((req, res, next) => {

    if (req.body) {
        let body;
        const mediaType = (req.headers["content-type"] || "").split(";")[0].trim().toLowerCase() // because sometimes are the headers are like `application/json;charset=utf-8`
        if (mediaType === "application/json") {
            try {
                body = JSON.parse(req.body);
            } catch (error) {
                return res.status(422).json({message: "Incorrect JSON body"})
            }
        }
        req.body = body;
    }
    next();
})



server.route("GET", "/", (req, res) => {
    res.sendFile("./public/index.html", "text/html");
});
// server.route("GET", "/login", (req, res) => {
//     res.sendFile("./public/index.html", "text/html");
// });

server.route("GET", "/styles.css", (req, res) => {
    res.sendFile("./public/styles.css", "text/css");
});

server.route("GET", "/scripts.js", (req, res) => {
    res.sendFile("./public/scripts.js", "text/javascript");
});


// JSON Routes

server.route("GET", "/api/posts", (req, res) => {
    POSTS.map((post) => {
        post.author = USERS.find((user) => user.id === post.userId).name;
    });
    res.status(200).json(POSTS);
});

server.route("POST", "/api/login", (req, res) => {
    let body = req.body;

    const username = body.username;
    const password = body.password;

    // Check if user exists
    const user = USERS.find((user) => user.username === username);
    if (user && user.password === password) {
        // user is correct
        const token = Math.floor(Math.random() * 1000000000).toString();
        SESSIONS.push({userId:user.id, token: token});

        res.setCookie(`token=${token}; Path=/;`).status(200).json({
            message: "Logged in succesfully"
        });
    } else {
        res.status(401).json({
            error: "Invalid username or password"
        })
    }
});

server.route("DELETE", "/api/logout", (req, res) => {
    // Remove the sesssion
    const sIndex = SESSIONS.findIndex((session) => session.userId === req.userId);
    if (sIndex > -1) {
        SESSIONS.splice(sIndex, 1);
    }
    res.setCookie("token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    res.status(200).json({message: "Logged Out Successfully"});
});


server.route("PUT", "/api/user", (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    const user = USERS.find((user) => user.id === req.userId);

    user.username = username;
    user.name = name;
    if (password) {
        user.password = password;
    }

    res.status(200).json({username: user.username, name: user.name, password_status: password ? "updated" : "not updated"});
});

server.route("POST", "/api/posts", (req, res) => {
    let title = req.body.title; 
    let body = req.body.body;

    if (!title || !body) {
        res.status(400).json({message: "Incorrect format"})
    }

    const post = {
        id: POSTS.length + 1,
        title: title,
        body: body,
        userId: req.userId,
    }

    POSTS.push(post);
    return res.status(201).json(post);
});


server.route("GET", "/api/user", (req, res) => {
    const user = USERS.find((user) => user.id === req.userId);
    res.status(200).json(user);
})
server.listen(PORT, () => {
    console.log("Server started at", PORT);
});
