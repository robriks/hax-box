import Link from 'next/link';
import Image from 'next/image';
import BirbBanner from '../public/birb-banner.jpg';

export default function Header() {
    return (
        <div className='justify-center h-auto w-auto'>
            <header className='bg-header'>
                <nav className='p-6 mx-auto justify-between max-w-screen-xl'>
                    <div className='flow-root ml-4 mt-2'>
                        <div className='flex justify-center place-content-center'>
                            <Link href='/'>
                                <a className='max-w-md'>
                                    <Image src={BirbBanner} className='rounded-full' alt=''></Image>
                                </a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <div className='flex justify-center w-auto'>
          <div className='bg-gradient-to-r from-violet-100 to-indigo-300 p-4 sm:p-6 shadow-2xl rounded-full'>
            <div className='flex justify-items-stretch sm:text-2xl space-x-6 sm:space-x-10 w-auto'>
              <Link href="/">
                <a className="nav-link text-blue-700">Home</a>
              </Link>
              <Link href='/faucet'>
                <a className='nav-link text-blue-700'>Faucet</a>
              </Link>
              <Link href='/stake'>
                <a className='nav-link text-blue-700'>Staking</a>
              </Link>
              <Link href='/about'>
                <a className='nav-link text-blue-700'>Web3</a>
              </Link>
              <Link href='/tutorial'>
                <a className='nav-link text-blue-700'>Tutorial</a>
              </Link>
            </div>
          </div>
        </div>
        </div>
    )
}