import {useRouter} from 'next/router'
import swr from '../../../lib/swr.js';
import Navbar from '../../../components/Navbar.js';
import Head from '../../../components/Head.js';
import axios from 'axios'
import useSWR from "swr";
export default function Dashboard(){
 
  const router = useRouter()
  const { query: { dynamic, id }, } = router
  let { data: identify } = swr('/api/@me/identify');
  let user = identify ? identify.user : null;
  if(!user) return(<><div class="text-red-600 text-center">Access Denied ! Please Login</div></>)
    if(!id) return(<><div class="text-red-600 text-center">Access Denied ! Please Provide Guild ID</div></>)
 // let taraizni = swr(`/api/dashboard/guilds?guildID=${id}&userID=`)
  let address = `https://greesy.fun/api/dashboard/guildCheck?guildID=${id}`
   const fetcher = async (url) => await axios.get(url).then((res) => res.data); 
const checkGuild = fetcher(address)

  return checkGuild === false ? (
    <>
      <Head />
      <Navbar/>
      <center>
        <a href="#" class="w-full rounded-lg border border-blue-600 py-5 px-6 text-white">
         <i class="py-5 fab fa-discord"></i>
         Add Bot 
        </a>
      </center>
    </>
  )
  :
  (
    <>
    <Head />
    <Navbar />
   

    <center>
      <a href="#" class="w-full rounded-lg border border-blue-600 py-5 px-6 text-white">
       <i class="py-5 fab fa-discord"></i>
         Burası eğer bot sunucuda varsa kısmı
      </a>
    </center>

    </>
  )
} 
