import * as React from 'react';
import Navbar from '../components/Navbar'
import swr from '../lib/swr.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'

const people = [
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
  {
      name: "poll",
      description: "Creates Poll in a Server.",
      category:"Moderation",
      role: "Mod",
      email:''

  },
  {
    name: 'ping',
    description: 'View Greesy s Ping ',
    category: 'User',
    role: 'User',
    email: ''
  },
  {
    name: 'ping',
    description: 'View Greesy s Ping ',
    category: 'User',
    role: 'User',
    email: ''
  },
   
  // More people...
]

export default function BasicTable() {
  
let { data: fetchCommands } = swr('/api/commands');
	let peoplee = fetchCommands ? fetchCommands.commands : [];

  return (
    <>
      <div className=" rounded-lg header-greesy bg-blue-400"><h1>.</h1></div>
  
    <Navbar/>
    <br />
    <h1 className="rounded-lg text-center text-white font-xs">Commands</h1>
    <br />
            <br />
            <br />
            <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Permission
                  </th>
                 
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">


                  
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{person.name}</div>
                          <div className="text-sm text-gray-500">{person.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.description}</div>
                      <div className="text-sm text-gray-500">{person.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
            
            </>
  );
}
