var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;
const { click } = require("@testing-library/user-event/dist/click");

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var ConStr = "mongodb://127.0.0.1:27017";

app.get("/users", (request, response)=>{
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videotutorials");
        database.collection("tblusers").find({}).toArray().then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.post("/register-user", (request, response)=>{
    var user = {
       " UserId": request.body.UserId,
        "UserName": request.body.UserName,
        "Password": request.body.Password,
        "Email": request.body.Email,
        "Mobile": request.body.Mobile
    }
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videotutorials");
        database.collection("tblusers").insertOne(user)
        .then(()=>{
            console.log("User Added");
            response.end();
        });
    });
});

app.get("/admin", (request, response)=>{
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videotutorials");
        database.collection("tbladmin").find({}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.get("/getcategories", (request, response)=>{
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videotutorials");
        database.collection("tblcategories").find({}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.get("/getvideos", (request, response)=>{
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videotutorials");
        database.collection("tblvideos").find({}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.get("/getvideo/:id", (request, response)=>{
    var id = parseInt(request.params.id);

    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videotutorials");
        database.collection("tblvideos").find({VideoId:id}).toArray()
        .then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});


app.post("/addvideo", (request, response)=>{
    var video = {
        "VideoId": parseInt(request.body.VideoId),
        "Title": request.body.Title,
        "Url": request.body.Url,
        "Likes": parseInt(request.body.Likes),
        "Views": parseInt(request.body.Views),
        "CategoryName": request.body.CategoryName
    }
    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videotutorials");
        database.collection("tblvideos").insertOne(video)
        .then(()=>{
            console.log("Video Added");
        });
    });
});

app.put("/updatevideo/:id", (request, response)=>{
    var id = parseInt(request.params.id);

    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videotutorials");
        database.collection("tblvideos").updateOne({VideoId:id}, 
            {$set :
                 {VideoId:parseInt(request.body.VideoId), Title:request.body.Title,
                 Url: request.body.Url,
                 Likes: parseInt(request.body.Likes), Views: parseInt(request.body.Views), CategoryName: request.body.CategoryName}})
        .then(()=>{
            console.log("Video Updated");
        });
    });
});

app.delete("/deletevideo/:id", (request, response)=>{
    var id = parseInt(request.params.id);

    mongoClient.connect(ConStr)
    .then(clientObject=>{
        var database = clientObject.db("videotutorials");
        database.collection("tblvideos").deleteOne({VideoId:id})
        .then(()=>{
            console.log("Video Deleted");
        });
    });
});


app.listen(8000);
console.log('Server Started : http://127.0.0.1:8000');