var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    moment = require('moment');

var port = process.env.PORT || 3000;

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.json()); //for parsing application/JASON
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(methodOverride("_method")); // if in the url query see _method take its value and override the method value with it
app.use(expressSanitizer()); // mount express-sanitizer middleware here


// Connect to the MongoDB
require('dotenv').config();
mongoose.connect(process.env.url, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to blog DB');
}).catch(err => {
    console.log('Error : ', err.message);
});

// MONGOOSE / MODEL CONFIG
// Schema setup for Mongoose
var blogPostSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
// Create a model from Schema
var BlogPost = new mongoose.model("BlogPost", blogPostSchema);

// Test it
// BlogPost.create({
//     title: "Cat sitter needed",
//     image: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500",
//     body: "askdhjfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdf hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfg jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd  jf jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfjfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd  jfsadhfgs kdhjgfksadf gksadhfgksdh fksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsdk akhsgdfgsd jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsdsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd sdfkha hgasdfgkasdhgf  asgdfsdg k ahsgdfak s ajsdgfiwueyf a uweyfwqfkj sd owu gfjdksjdhfieyfksdfbk  iuwlfsakjdbfk oaud fksafjsdhf aosduhf asfhlasdfh ud asgdf  ahsgdf  kahsgdfh kueugf  awey k kasgdf akj weyrpow fasdi ksd  sahgdf  kajshgd f kajhgsd f kgasd k askdhg  akshdgf   ashdgf aksdh asd kasg asdf   asgdf as akshd  akshdgf a kdhg   askdh  asdkh  akd f akhd  akdh f akd   akdh   akd f df  weuyf kasdf aksd  askdgf aakdf  akdgf a ksudgf7ew ak dhfg aufwyef kjsa asudfyoas dbfkaiwe kajsd kasudyf asdfuasdufy  sdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfg jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd  jf jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfjfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd  jfsadhfgs kdhjgfksadf gksadhfgksdh fksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsdk akhsgdfgsd jfsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsdsadhfgskdhjgfksadfgksadhfgksdhfksadasbdb hsadfsdf asgdfsdhg hagsdfkashdgf ashgdfgasdgfk akhsgdfgsd sdfkha hgasdfgkasdhgf  asgdfsdg k ahsgdfak s ajsdgfiwueyf a uweyfwqfkj sd owu gfjdksjdhfieyfksdfbk  iuwlfsakjdbfk oaud fksafjsdhf aosduhf asfhlasdfh ud asgdf  ahsgdf  kahsgdfh kueugf  awey k kasgdf akj weyrpow fasdi ksd  sahgdf  kajshgd f kajhgsd f kgasd k askdhg  akshdgf   ashdgf aksdh asd kasg asdf   asgdf as akshd  akshdgf a kdhg   askdh  asdkh  akd f akhd  akdh f akd   akdh   akd f df  weuyf kasdf aksd  askdgf aakdf  akdgf a ksudgf7ew ak dhfg aufwyef kjsa asudfyoas dbfkaiwe kajsd kasudyf asdfuasdufy "
// }, (err, blogPost) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(blogPost);
//     }
// });

// Redirect the home page
app.get('/', (req,res)=>{
    res.redirect('/blogs');
})

// RESTful ROUTES
// 1. Index : list all posts
app.get('/blogs', (req, res) => {
    // Get all blog posts from DB
    BlogPost.find({}, (err, allBlogPosts) => {
        if (err) {
            console.log("Error in retrieving data frm DB");
        } else {
            res.render("index", { blogPost: allBlogPosts });
        };
    });
})
// 2. New : show a form for creating a new post
app.get('/blogs/new', (req, res) => {
    res.render('new')
});

// 3. CREATE : create and add a new post to DB, r edirect to blogs
app.post('/blogs', (req, res) => {
    // Create blog
    // console.log(req.body.blog)
    // Sanitize the input
    console.log(req.body)
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(req.body)

    BlogPost.create(req.body.blog, (err, newPost) => {
        if (err) {
            res.render('/new');
        } else {
            // redirect to index
            res.redirect('/blogs')
        }
    })
})

// 4. SHOW ROUTE : show information about a specific post
app.get('/blogs/:id', (req, res) => {
    BlogPost.findById(req.params.id, (err, foundPost) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            console.log(moment(foundPost.created).format('MMMM Do YYYY, h:mm:ss a'))
            res.render('show', { post: foundPost });
        };
    });
})

// 5. EDIT ROUTE: show edit form for one post
app.get('/blogs/:id/edit', (req, res) => {
    BlogPost.findById(req.params.id, (err, foundPost) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render("edit", { post: foundPost });
        }
    })
})

// 6. UPDATE ROUTE : Update a post in the DB and redirec to somewhere else (that post)
app.put('/blogs/:id', (req, res) => {
    // console.log(req.params)
    // Sanitize the input
    req.body.blog.body = req.sanitize(req.body.blog.body);

    BlogPost.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedPost) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id)
        }
    })
})

// 7. DELETE ROUTE : remove a post and then redirect
app.delete('/blogs/:id', (req, res) => {
    BlogPost.findByIdAndRemove(req.params.id, (err, deletedPost) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    })
})


app.listen(port, () => {
    console.log("BlogApp server started ...", port);
})