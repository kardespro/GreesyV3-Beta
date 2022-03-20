// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
export default async(req, res) => {
  let base = "https://api.greesy.fun/api/v1/web-stats/web-joins"
  let body = {"joinLenght": 1}
  await axios.post(base,body)
  res.status(200).json({ success:true })
}
