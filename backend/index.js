const express = require('express');
const passport = require("passport"); const session = require("express-session"); 
const Strategy = require("passport-discord").Strategy;
const MemoryStore = require("memorystore")(session); 
const url = require("url");
const request = require("request")
const db = require("quick.db")
const Discord = require("discord.js");
const client = new Discord.Client()
const gClient = new Discord.Client()
var ipgeoblock = require("node-ipgeoblock");
const axios = require("axios")
const access_black = require("./access.json")
const settings = require("./settings.json")
const app = express();
//Uptime Nextjs
setInterval(function(){
  request.get("https://greesy.fun")//Replace Your ClientSide URL
  request.get("https://greesy.fun")
  request.get("https://greesy.fun")
},2000)

//string

var generateRandomString = function(length) { var text = ''; var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; for (var i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); } return text;};



app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(
	session({
	  secret: "55CWSa21QbGeNxiJX3HngI7gm_F5bEGiZMGDu5rcUlDqILu1K9q_m4wDHDX3Prk84xurn9gyZgVIr",
	  resave: false,
	  saveUninitialized: false
	})
);
//new login

passport.serializeUser((user, done) => done(null, user)); passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new Strategy({
	clientID: "ID HERE",
	clientSecret: "SECRET HERE",
	callbackURL: "https://api.greesy.fun/auth/callback",
	scope: [ "identify", "guilds" ]
}, (accessToken, refreshToken, profile, done) => {
	process.nextTick(() => done(null, profile));
}));

app.use(passport.initialize()); app.use(passport.session());


 
app.use(require('cors')({
	origin: 'https://greesy.fun'
}));


//Country Blocker
function defender(req,res){
 /* let blacks = access_black.blacklist_ip;*/
  let blacks = "217.47.139.59"
  let acceser_ip = req.headers["x-forwarded-for"];
  //if(access_black.blacklist_ip.includes(acceser_ip)) 
  if(acceser_ip === blacks) return res.json({success:false,message:"This Country Has Been Banned From Greesy API . info@greesy.fun"})
  
}


//     
//
//
//  Functions
//
//
//

function ddosFind(){
  let limit = 100
  let reqCek = db.fetch(`requests`)
  if(reqCek > limit) return db.add(`requests`,+1) && "Ddos Finded"
  return false
}

function reqAdd(reqsayi){
  if(!reqsayi) return new TypeError("Error")
  db.add(`requests`,+1)
  return true
}


// 50 Second To Delete Requests

setInterval(function(){
  console.log(db.fetch(`requests`))
  db.delete(`requests`)
  // By Nego
}, 50000)


app.get('/',  (req, res) => {
  reqAdd(1)
  ddosFind()
  console.log(db.fetch(`requests`))
  res.json({status: "200", message: "Server OK"})
});


// cdn

app.get("/uploads/nego.png", (req,res) => {
  request("https://cdn.discordapp.com/avatars/682607343707488388/c6633ba82ef57f9908f65fe8bf546928.png?size=1024").pipe(res)
})




app.post("/api/v1/web-stats/web-joins",(req,res) => {
  let j = req.body.joinLenght
  if(!j) return res.json({success:false})
  db.add(`webJoin`,+j)
  res.json({success:true})
})
console.log(db.fetch(`webJoin`))
app.get("/api/v1/commands", (req,res) => {
  
const cmds = [
  {
    name: 'eval',
    description: 'This Command Using By Owners',
    category: 'Moderation',
    role: 'Admin',
    email: ''
  },
  {
    name: 'ping',
    description: 'View Greesy s Ping ',
    category: 'User',
    role: 'User',
    email: ''
  },
   
  
]
res.json(cmds)
})
//Stats Post

function addStats(kulsayi,gsayi,erisimkodu){
  if(!kulsayi && !gsayi && !erisimkodu) return "Error !"
  let izinkodu = "GR-31-EE-31-SY"
  if(!erisimkodu === izinkodu) return "Access Denied"
  db.set(`kulsayi`,kulsayi)
  db.set(`gsayi`,gsayi)
  return true
}
app.get("/api/v1/post-stats", (req,res) => {
  let q = req.query
  res.json(addStats(q.kulsayi,q.gsayi,q.acess))
})
//Permission
function redirectCreate(link,res){
  if(!link) return "Error"
  setInterval(function(){
    res.redirect(link)
  },5000)
}
/*
app.get("/api/v1/guilds/:swid/", (req,res) => {
  if(!req.params.swid) return res.json({status:404,message: "Greesy Not Added In The Guild ! Wait 5 Minute To Redirect Greesy Invite Page !"}) && redirectCreate("/invite",res);
  res.json({success:true})
})*/



app.get("/api/v1/user-guilds", (req,res) => {
  let user = req.user;
  if(!user) return res.json({status:403,mesaage: "Access Denied"})
  res.json(user.guilds)
})
//Permission
app.get("/api/v1/guilds/permissions/check/:permcode", (req,res)=> {
  let i = req.params.permcode;
  if(!i) return res.json({message: "500"})
  const perms = Discord.Permissions;
  const permsOnGuild = new perms(i); if(!permsOnGuild.has("MANAGE_GUILD")) return res.json({message: "false"});
  res.json(true)
})
app.get('/api/v1/shard', (req, res) => {
  let shardArray = [
    "1","2","3","4","5"
  ]
  res.json(shardArray)
});

app.get("/api/v1/owners", (req,res) => {
  let IDS = ["682607343707488388"]
  res.json({owners:IDS})
})

app.get("/api/v1/logger", (req,res) => {
  let q = req.query.msg;
  console.log(`[NEXT.JS] ${q}`)
  res.json({message:true})
})


app.get('/api/giveaways/:swid', (req, res) => {
  let sw = req.params.swid;
  if(!sw) return res.json({status:404, message: "Server ID Unknown"})
  res.json({status: "200", message: "Server OK"})
});

//login

const DOMAIN = 'greesy.fun';//NextJS Domain Here
	const PROTOCOL = 'https';
	const PATH = '/api/auth/callback';

app.get("/auth/login", (req, res, next) => {
		//req.session._authCallback = req.query.url || '/';
		next();
	}, passport.authenticate("discord", {
		scope: [ "identify", "guilds" ]
		//prompt: "none"
	}));

app.get("/auth/callback", passport.authenticate("discord", {
		failureRedirect: "/auth/login"
	}), async (req, res) => {
		if (req.user) {
		//	res.redirect("DOMAINHERe/api/auth/callback");
      res.redirect((PROTOCOL + '://' + DOMAIN + PATH) + ('?code=' + req.user.accessToken) + ('&url=' + (req.session._authCallback || '/')));

		} else {
			res.redirect('/auth/login');
		};
	});

// SPOTIFY LOGIN
var querystring = require('querystring');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret
var redirect_uri = 'https://api.greesy.fun/api/logins/spotify/callback'; // Your redirect uri
var stateKey = 'spotify_auth_state';

app.get('/api/auth/spotify', function(req, res) {
  var state = generateRandomString(16); res.cookie(stateKey, state); // your application requests authorization
                                      var scope = 'user-read-private user-read-email'; res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({ response_type: 'code', client_id: client_id, scope: scope, redirect_uri: redirect_uri, state: state }));});



app.get("/api/logins/spotify/callback", (req,res) => {
 var code = req.query.code || null;
  //res.clearCookie(stateKey);
  var authOptions = { url: 'https://accounts.spotify.com/api/token', form: { code: code, redirect_uri: redirect_uri, grant_type: 'authorization_code' }, headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) }, json: true }; request.post(authOptions, function(error, response, body) { if (!error && response.statusCode === 200) { var access_token = body.access_token, refresh_token = body.refresh_token; var options = { url: 'https://api.spotify.com/v1/me', headers: { 'Authorization': 'Bearer ' + access_token }, json: true }; // use the access token to access the Spotify Web API
                                                                                                                                                                                                                                                                                                                                                                                                                     request.get(options, function(error, response, body) { console.log(body); }); // we can also pass the token to the browser to make requests from there
                                                                                                                                                                                                                                                                                                                                                                                                                     res.redirect('https://greesy.fun/api/auth/spotify/callback?' + querystring.stringify({ access_token: access_token })); } else { res.redirect('/#' + querystring.stringify({ error: 'invalid_token' })); } });
})

app.get('/api/spotify/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});


//connections
app.get("/api/v1/user/:userid/connections", (req,res) => {
  if(!req.params.userid) return res.redirect("https://greesy.fun")
  let check = db.fetch(`spotify.${req.params.userid}`)
  if(!check) return res.json({status:403,message:"Permission Denied"})
  res.json({connected:true})
})


app.get("/api/v1/storage/database/spotify/user/:userid", (req,res) => {
  let uid = req.params.userid;
  let c = db.fetch(`spotify.${uid}`)
  if(!uid) return res.json({status:404,message:"Unknown"})
  res.json(c)
})


app.get("/api/v1/storage/database/connections/spotify", (req,res) => {
 let uid = req.query.userid;
 let tokken = req.query.access_token;
  if(!uid && !tokken) return res.json({message: "Server Error"})
 let tcheck = db.fetch(`spotify.${uid}`)
 if(tcheck) return res.json({status:403,message: "User Exist In System"})
  let datam = {
    userID: uid,
    access_token:tokken,
    connected:true
  }
  db.set(`spotify.${uid}`,datam)
  res.redirect("https://greesy.fun/connections/spotify")
})



    //language API
 

//Load Lang 
function langLoad(lang){
  if(!lang) return "Lang Name Invalid"
  let reqq = require(`./langs/${lang}/index.json`)
  if(!reqq) return "Please Write Valid Lang (ISO) Code"
  return reqq;
}

app.get("/api/v1/languages/:langg", (req,res) => {
  if(!req.params.langg) return res.json({status:404,message: "Language Param Invalid"})
  let loadLanguage = langLoad(req.params.langg)
  if(!loadLanguage) return res.json({status:404,message: "Language Param Invalid"})
  res.json(JSON.parse(loadLanguage))
})

//image
app.get("/api/v1/storage/images/open", (req,res) => {
  let i = req.query.photo;
  if(!i) return res.json({status:403,message: "Storage Error"})
  request(i).pipe(res)
  
})

app.get("/api/v1/storage/css/", (req,res) => {
  let i = req.query.css;
  res.send(i)
})


app.get("/api/v1/storage/js/", (req,res) => {
  let i = req.query.js;
  i.replace(`webpack5.get`,`this.webAPI.runner.instances.getWebpack5`)
  res.send(i)
})


/*
*
*   Dashboard  API
*
*
*/

app.get("/api/v1/guilds/:gid", (req,res) => {
  let p = req.params.gid;
  if(!p) return res.json({success:false})
  let gd = gClient.guilds.cache.has(p)
  res.json({success:gd})
})










//404
app.use((req, res, next) => {
  res.status(404).json({success:false,message: "Access Denied"})
})
client.login("Token Here") /= Api Bot Token Here
gClient.login(settings.botToken)

client.on("ready", ()=> {
  console.log("Greeesy API Bot Aktif Edildi")
})

gClient.on("ready", ()=> {
  console.log("Greeesy  Bot Aktif Edildi")
})

/* STATS */
client.on("message", async msg => {
  let pref = "!"
  let k = "stats"
  if(msg.content === `${pref}${k}`){
    let gwt = await axios.get("https://discord.com")
    let gatewayGreesy = gwt.status;
    let reqnextjs = await axios.get("https://greesy.fun/")
    
   let siteStatus = reqnextjs.status;
   
    let apiStatus = await axios.get("https://api.greesy.fun/")
    let apiStatus2 = apiStatus.data.status ? "OK!":"Slowly!" || "BAD!";
     //Bot Status
    let botApiEndpoint = "https://fr.greesy.fun/api/web/status"// fr = France
  let botO = await axios.get(botApiEndpoint)
    let botStatus = botO.status;

    const emb = new Discord.MessageEmbed()
    .setTitle("Greesy | Status")
    .setColor("#3437eb")
    .setFooter("2019-2022 Greesy.Fun")
    .setDescription(`
     ** Greesy Stats **

    __WebServers__ :

    **NextJS**(Site) : <:online:916576302767677460> ${siteStatus}
    **Api Status** : <:online:916576302767677460> ${apiStatus2}
    **GateWay** : <:online:916576302767677460>  ${gatewayGreesy}

    __Bot__ :

    **🇫🇷France** : <:online:916576302767677460> ${botStatus || "Bad!"}

   __Analytics__ :

  
     **Views Site**  : ${db.fetch(`webJoin`)}
     **DDOS ATTACKS BY API** : ${db.fetch(`requests`) ? "Not Found!":"Site Slowly!" || "Attacking!"}
`);
    msg.channel.send(emb)
    
  }
})
app.listen(3000, () => {
  console.log('server started');
});
