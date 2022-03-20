import swr from '../../lib/swr.js';
import {  PulseLoader } from 'react-spinners'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

import axios from 'axios'
import Navbar from '../../components/Navbar'
import { useState , useEffect } from 'react';
//const [ gdata, setGdata ] = useState(''); 
export default function Dashboard(){
  const [guildd,setGuild] = useState()
  let { data: identify } = swr('/api/@me/identify');
	let user = identify ? identify.user : null;

/*
if(user){
 
  
}else{
  
return <div className="text-center text-red-400">Login</div>
}*/

  

  
const { data: amk } = swr('/api/@me/guilds')
  console.log(amk)
/*
  if (error) return <div className="text-red-400">Failed to load</div>*/
/*
    const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://api.greesy.fun/api/v1/user-guilds')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  */
  return(
    <>
<Navbar />
    <br />


 {identify ? (
                    user ? (
                     
                        <a className="w-full  rounded-lg bg-gray-400 ">
     {amk && amk.map((datanegoot) => (

       
                          
   <div class="rounded-lg py-3 px-5">
        <img src={`https://cdn.discordapp.com/icons/${datanegoot.id}/${datanegoot.icon}`} class="object-none h-48 w-96 rounded-full" />
   
  
 
        <p className="text-center text-green-400">{datanegoot.name}</p>
       <br />
  <br />
       <center>

       <a href="#" className="bg-blue-600 rounded-lg w-full py-5 px-3">Manage Guild</a>
       </center>
 <br />

        <br />


       
       </div>
      
   






       
                     
       
       
       
       
    
        ))}
    <br/>   
       
                        </a>
                       
       
                    ) : (
                      
                        <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-400 bg-indigo-200 bg-opacity-10 hover:text-white transition-all hover:bg-opacity-100 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10">
                            Login
                        </a>
                     
                    )
                  ) : (
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-400 bg-indigo-200 bg-opacity-10 hover:text-white transition-all hover:bg-opacity-100 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10">
                   Loading ...
                    </a>
                  )}
    
    </>
  
  )
}
