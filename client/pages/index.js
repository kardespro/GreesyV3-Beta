//import Snackbar from "@windui/snackbar"; 
import { Spinner } from '@chakra-ui/react'
import { PulseLoader } from 'react-spinners'

import Link from 'next/link'
import { useState } from 'react'
import { Fragment } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import swr from '../lib/swr.js'
import NegoHead from '../components/Head'
import Footer from '../components/Footer'
import Features from '../components/Features'
const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Commands', href: '/commands' },
    { name: 'Premium', href: '/premium' },
    { name: 'Statistics', href: '/stat' },
    { name: 'Shard Statistics', href: '/shard' },
]

export default function Example() {

    const router = useRouter();
    //POST Web-STATS To Greesy API ! 
    swr('/api/web-stats/join')
    let { data: identify } = swr('/api/@me/identify');
    let user = identify ? identify.user : null;
    let logo = "https://nextjs.com/favicon.ico"
    const [open, setOpen] = useState(false);
    //	const router = useRouter();
    /*
  const hello = new Snackbar({
              options: {
                  duration: 3000,
                  speed: 500, // animation speed
                  type: "info", // snackbar types: info, success, error, warning
                  align: "right", // right or left
                  position: "bottom" // top or bottom
              },
              title: "Hello World!",
              message: "No post on Sundays!"
          });
  
          // show snackbar
          hello.show();*/
    return (
        <>

            <NegoHead />

            <NegoHead />{user && <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" static className="z-60 fixed inset-0 overflow-hidden" open={open} onClose={setOpen}>
                    <div className="absolute inset-0 overflow-hidden">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                            <button
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Kapat</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="h-full flex flex-col py-6 bg-dark-1 shadow-xl overflow-y-scroll">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-2xl font-bold text-gray-100">User Panel</Dialog.Title>
                                        </div>
                                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                <div className="h-full w-full flex flex-col justify-between">
                                                    <ul className="user-menu">
                                                        <li className="mb-2">
                                                            <Link href="/promo-code">
                                                                <a className="text-white text-lg">
                                                                    <i className="far fa-gift mr-2"></i> Promo Code
													</a>
                                                            </Link>
                                                        </li>
                                                        <li className="mb-2">
                                                            <Link href="/dashboard">
                                                                <a className="text-white text-lg">
                                                                    <i className="far fa-server mr-2"></i> Dashboard
													</a>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                    <Link href={"/api/auth/logout?url=" + router.asPath}>
                                                        <a className="bg-red py-2 px-4 rounded-lg text-white font-semibold text-lg">
                                                            <i className="far fa-sign-out mr-2"></i> Logout
											</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>}
            <Popover className="relative bg-dark-1">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                                <div className="flex justify-start lg:w-0 lg:flex-1">
                                    <Link href="/">
                                        <a>
                                            <span className="sr-only">Greesy</span>
                                            <img className="h-8 w-auto rounded-lg sm:h-10" src="https://cdn.discordapp.com/avatars/817456729558220812/f652b7e7e190dbbe767276b3c32350b7.png" alt="Greesy" />
                                        </a>
                                    </Link>
                                </div>
                                <div className="-mr-2 -my-2 md:hidden">
                                    <Popover.Button className="bg-gray-3 rounded-md p-2 inline-flex items-center justify-center text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-700">
                                        <span className="sr-only">Menüyü Aç</span>
                                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                                <Popover.Group as="nav" className="hidden md:flex space-x-10">
                                    <Link href="/">
                                        <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                            <i className=""></i> Home
								</a>
                                    </Link>
                                    <Link href="/blog">
                                        <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                            <i className=""></i> Blog
								</a>
                                    </Link>
                                    <Link href="https://status.greesy.fun/">
                                        <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                            <i className="far fa-toolbox mr-1"></i> Status
								</a>
                                    </Link>


                                    <Link href="/premium">
                                        <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                            <i className="far fa-diamond mr-1"></i> Premium
								</a>
                                    </Link>

                                    <Link href="/commands">
                                        <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                            <i className="far fa-list mr-1"></i> Commands
								</a>
                                    </Link>
                                </Popover.Group>
                                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                    {identify ? (user ? (
                                        <a onClick={() => setOpen(true)} className="ml-8 whitespace-nowrap cursor-pointer inline-flex items-center justify-center p-1.5 px-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blurple hover:opacity-90">
                                            <img onError={(e) => e.target.src = logo} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`} className="w-7 rounded-lg mr-3" /> {user.username + '#' + user.discriminator}
                                        </a>
                                    ) : (
                                            <Link href={"/api/auth/login?url=" + router.asPath}>
                                                <a className="ml-8 whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blurple hover:opacity-90">
                                                    Login
									</a>
                                            </Link>
                                        )) : (
                                            <a className="ml-8 whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blurple hover:opacity-90">
                                                Loading...
								</a>
                                        )}
                                </div>
                            </div>
                        </div>

                        <Transition
                            show={open}
                            as={Fragment}
                            enter="duration-200 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-100 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Popover.Panel
                                focus
                                static
                                className="absolute top-0 inset-x-0 z-50 p-2 transition transform origin-top-right md:hidden"
                            >
                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-dark-3 divide-y-2 divide-gray-700">
                                    <div className="pt-5 pb-6 px-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <img
                                                    className="h-8 w-auto rounded-lg" src="https://cdn.discordapp.com/avatars/817456729558220812/f652b7e7e190dbbe767276b3c32350b7.png" alt="Greesy" />
                                            </div>
                                            <div className="-mr-2">
                                                <Popover.Button className="bg-gray-2 rounded-md p-2 inline-flex items-center justify-center text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
                                                    <span className="sr-only">Menüyü Kapat</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </Popover.Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-6 px-5 space-y-6">
                                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                            <Link href="/">
                                                <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                                    <i className="far fa-home mr-1"></i> Home
									</a>
                                            </Link>
                                            <Link href="/blog">
                                                <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                                    <i className="far fa-blog mr-1"></i> Blog
									</a>
                                            </Link>
                                            <Link href="/premium">
                                                <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                                    <i className="far fa-diamond mr-1"></i> Premium
									</a>
                                            </Link>


                                            <Link href="https://status.greesy.fun/">
                                                <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                                    <i className="far fa-toolbar mr-1"></i> Status
								</a>
                                            </Link>

                                            <Link href="/commands">
                                                <a className="text-base font-medium text-gray-100 hover:text-gray-300">
                                                    <i className="far fa-list mr-1"></i> Commands
									</a>
                                            </Link>
                                        </div>
                                        <div>
                                            {identify ? (user ? (
                                                <a onClick={() => setOpen(true)} className="cursor-pointer w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blurple hover:opacity-90">
                                                    <img onError={(e) => e.target.src = logo} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`} className="w-7 rounded-lg mr-3" /> {user.username + '#' + user.discriminator}
                                                </a>
                                            ) : (
                                                    <Link href={"/api/auth/login?url=" + router.asPath}>
                                                        <a className="cursor-pointer w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blurple hover:opacity-90">
                                                            Login
										</a>
                                                    </Link>
                                                )) : (
                                                    <a className="cursor-pointer w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blurple hover:opacity-90">
                                                        Loading...
									</a>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>


            <br />
            <main className="flex bg-gray-900 px-5 transition-all py-5 w-full rounded-lg mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                    <br />

                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="text-white block xl:inline">Greesy</span>{' '}
                        <span className="block text-indigo-600 xl:inline">Bot</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Best Functionally Bot On Discord . Moderation , GiveAways And More !
              </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">

                            <a
                                href="#"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                            >

                                <i class=""></i>  Invite
                  </a>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                            {identify ? (
                                user ? (
                                    <Link href="/dashboard">
                                        <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-400 bg-indigo-200 bg-opacity-10 hover:text-white transition-all hover:bg-opacity-100 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10">
                                            <i class="fad fa-layer-plus"></i>   Dashboard
                        </a>
                                    </Link>
                                ) : (
                                        <Link href="/api/auth/login">
                                            <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-400 bg-indigo-200 bg-opacity-10 hover:text-white transition-all hover:bg-opacity-100 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10">
                                                Login
                        </a>
                                        </Link>
                                    )
                            ) : (
                                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-400 bg-indigo-200 bg-opacity-10 hover:text-white transition-all hover:bg-opacity-100 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10">
                                        <PulseLoader color="#3437eb" />
                                    </a>
                                )}
                        </div>

                    </div>
                </div>
            </main>
            <br />
            <Features />
            <br />
            <br />
            <Footer />
        </>
    )
}

