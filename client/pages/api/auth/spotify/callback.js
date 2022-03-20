import axios from 'axios'
import Identify from '../../../../lib/session.js';
import dbConnect from '../../../../lib/dbConnect'
import Spotify from '../../../../models/spotify'

export default Identify(async (req, res, session) => {
  
 await dbConnect() 


  
let _user = req.session.get('user');
  
  let SPTFY_TOKEN = "https://accounts.spotify.com/api/token"
  let SPTFY_ME = "https://accounts.spotify.com/api/me"

  let sptoken = req.query["access_token"]
  
  if(!sptoken) return res.json({status:404, message: "An Unknown Token Was Provided"})

  if(_user){
    /*
await new Spotify({
  userID:_user.id,
  access_token:sptoken,
  connected:true
}).save()*/
    
    await Spotify.updateOne({
        userID: _user.id
    }, {
        $set: {
            access_token:sptoken,
            connected:true
        }
    }, { upsert: true })
    //Request The API
    await axios.get(`https://api.greesy.fun/api/v1/storage/database/connections/spotify?userid=${_user.id}&access_token=${sptoken}`)
    res.redirect("/connections/spotify")
  }else{
    res.json({status:403,message: "Please Login ."})
  }
  })
                                        
