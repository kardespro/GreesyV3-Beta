export default () => {

    const footerNavs = [
        {
            href: 'javascript:void()',
            name: 'Home'
        },
        {
            href: 'javascript:void()',
            name: 'Blog'
        },
        {
            href: '/dashboard',
            name: 'Dashboard'
        },
        {
            href: '/team',
            name: 'Team'
        },
        {
            href: '/premium',
            name: 'Premium'
        },

        {
            href: '/commands',
            name: 'Commands'
        },
       {
            href: 'https://api.greesy.fun/api/v1/invite',
            name: 'Invite'
       }
    ]

    return (
      <>
      <hr />
        <footer className="foo-greesy text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <img src="https://cdn.discordapp.com/avatars/817456729558220812/f652b7e7e190dbbe767276b3c32350b7.webp" className="r-greesy w-32 p-50 sm:mx-auto" />
                <p className="leading-relaxed mt-2 text-[15px]">
                    Greesy has Advanced Mod,Server-Stats,Giveaways and more Systems. Greesy Created at 2019, we help to server owners' make Best Guilds.
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {
                    footerNavs.map((item, idx) => (
                        <li className=" hover:text-gray-800">
                            <a key={idx} href={item.href}>
                                { item.name }
                            </a>
                        </li>
                    ))
                }
            </ul>
            <div className="mt-8 items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0">
                    &copy; 2019-2022 Greesy All Rights Reserved!
                </div>
                
            </div>
            <style jsx>{`
                .svg-icon path,
                .svg-icon polygon,
                .svg-icon rect {
                    fill: currentColor;
                }
            `}</style>
        </footer>
                      </>
    )
}
