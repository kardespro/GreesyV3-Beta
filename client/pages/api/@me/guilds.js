//import { connectToDatabase } from "../../../util/mongodb";
import Identify from '../../../lib/session.js';
import dbConnect from '../../../lib/dbConnect'
import Spotify from '../../../models/spotify'
import axios from 'axios'

//export default async (req, res) => {
export default Identify(async (req, res, session) => {
 // let tknego = req.query['token']
 // if(!tknego) return res.json({status:401,message:"This Method Used To Discord User Token"})
 await dbConnect() 


  
let _user = req.session.get('user');
  
let _token = _user ? _user.accessToken : null; if (_user) delete _user.accessToken;
  
//Id Cek
  const _updateUser = await fetch('https://discord.com/api/v8/users/@me', { headers: { Authorization: 'Bearer ' + _token } }); const _newUser = await _updateUser.json();

  let dcApi = "https://discord.com/api/users/@me/guilds"
  if(_user){
  

let rte = await axios.get(dcApi, { headers: { Authorization: 'Bearer ' + _token } })
let permCheckURL = "https://api.greesy.fun/api/v1/guilds/permissions/check/"
    /*rte.data.map(a => {
      let ftnego =  axios.get(`${permCheckURL}${a.permissions}`)
      let tree = ftnego.data
      if(tree.message === false) return;
       res.json(rte.data)

      
    })*/
    res.json(rte.data)

    
  }
   res.status(200).json({ name: 'Please Login' })
})
