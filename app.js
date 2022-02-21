const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// set view engine
app.set("view engine", 'ejs');

// use body request
app.use(bodyParser.urlencoded({extended: true}));

// use static
app.use(express.static(__dirname+"/public"));


let toastNotif = false;


///// Recipes /////

const recipes = [
  {
    judulResep: 'Ayam Geprek Pedas',
    deskripsi: 'Sambal geprek ayam ini pedasnya bikin lidah terbakar. Yuk, buktikan sendiri kelezatannya untuk santap di rumah hari ini! Mari simak resepnya berikut ini!',
    bahan_1: '4 filet dada ayam tidak putus',
    bahan_2: '½ sdt merica putih bubuk',
    bahan_3: '1 sdt garam',
    bahan_4: '1 butir telur ayam, kocok lepas',
    bahan_5: 'minyak, untuk menggoreng'
  }
];


///// Recipes end /////


// Routes //

app.get("/", (req, res) => {
  res.render("home", {
    allRecipes: recipes
  })
})


app.get("/admin", (req, res) => {
  res.render("admin")
})


app.post("/admin", (req, res) => {

  const recipe = req.body;
  recipes.push(recipe);
  
  setTimeout(() => {
    res.render("admin");
  }, 2000);

  // res.redirect("/admin");

  console.log(recipes);

})



app.get('/detail/:resepDetail', (req, res) => {

  // ambil params buat title
  const {resepDetail} = req.params;

  res.render('detail', {
    allRecipes: recipes,
    param: resepDetail
  })
})



app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})
