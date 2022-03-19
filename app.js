const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const _ = require("loadsh");
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;

// set view engine
app.set("view engine", 'ejs');
app.set("views", __dirname + "/views")

// use body request
app.use(bodyParser.urlencoded({extended: true}));

// use static
app.use(express.static(__dirname+"/public"));

// method override
app.use(methodOverride('_method'));

let toastNotif = false;


///// Recipes /////

let recipes = [
  {
    id: uuidv4(),
    judulResep: 'Ayam Geprek Pedas',
    deskripsi: 'Sambal geprek ayam ini pedasnya bikin lidah terbakar. Yuk, buktikan sendiri kelezatannya untuk santap di rumah hari ini! Mari simak resepnya berikut ini!',
    slug: _.kebabCase('Ayam Geprek Pedas'),
    bahans: [
      '4 filet dada ayam tidak putus',
      '½ sdt merica putih bubuk',
      '1 sdt garam',
      '1 butir telur ayam, kocok lepas',
      'minyak, untuk menggoreng'
    ]
  }
];


///// Recipes end /////


//// Routes /////


// READ
app.get("/", (req, res) => {
  res.render("home", {
    allRecipes: recipes
  })
})


app.get("/admin", (req, res) => {
  res.render("admin")
})


// CREATE FORM
app.post("/admin", (req, res) => {

  // destructring input form
  const {judulResep, deskripsi, ...bahan} = req.body; 

  // push ke array bentuk object, dan buat slug
  recipes.push({id: uuidv4(), judulResep, deskripsi, ...bahan, slug: _.kebabCase(judulResep)});
  
  setTimeout(() => {
    res.render("admin");
  }, 2000);

  // res.redirect("/admin");

  console.log(recipes);

})


// READ DETAILS
app.get('/detail/:resepDetail', (req, res) => {

  // ambil params buat title
  let resepDetail = _.lowerCase(req.params.resepDetail);

  // loop recipes buat cari resep yg sama dgn param
  recipes.forEach((recipe) => {
    let resepTitle = _.lowerCase(recipe.judulResep);

    // cocokkin dan render
    if(resepDetail === resepTitle) {
      res.render('detail', {
        resep: recipe
      })
      // console.log("match");
      console.log(recipe);
    }

  });
  
});


// UPDATE GET
app.get("/detail/:resepDetail/:id/edit", (req, res) => {
  const {resepDetail, id} = req.params;

  let recipeEdit = recipes.find((rec) => rec.id == id);

  res.render("edit", {recipeEdit})
  // res.send("ok")
})


// UPDATE PUT
app.patch("/update-resep/:id", (req, res) =>{

  const {id} = req.params;
  const {judulResep, deskripsi, bahans} = req.body;
  let slug = _.kebabCase(judulResep);

  recipes.forEach((recipe, i) => {
    
    if(recipe.id === id) {
      recipe.judulResep = judulResep;
      recipe.deskripsi = deskripsi;
      recipe.bahans = bahans;
      recipe.slug = slug

      res.redirect("/")
      // console.log(recipe);
    }

  })

  // console.log(recipes);

})


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})
