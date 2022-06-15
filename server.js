const express = require("express");
const connectDb  = require('./config/dbConnect')
const ShortUrl = require('./model/url');
const open = require('open');
const app = express();

connectDb();
app.use(express.urlencoded({extended:false}));
app.set('view engine' , 'ejs');

app.get('/', async ( req , res )=>{
    const shortUrl = await ShortUrl.find();
    res.render('index',{shortUrls:shortUrl});
})

app.post('/shortUrls', async (req,res)=>{
  await ShortUrl.create({fullUrl: req.body.fullUrl})
  res.redirect('/');
});

app.get('/:shortUrl',async (req,res)=>{
  const shortUrl = await ShortUrl.findOne({ shortUrl : req.params.shortUrl});
  if(shortUrl == null){
   return res.sendStatus(404);
  }
  shortUrl.clicks++;
  shortUrl.save();
  //window.open();
  open( shortUrl.fullUrl , function (err) {
      if ( err ) throw err;    
  });
  res.redirect('/');
})
app.listen(process.env.PORT || 5000);
