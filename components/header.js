import Link from 'next/link';
import Image from 'next/image';
import BirbBanner from '../public/birb-banner.jpg';

export default function Header() {
  return (
    <div className='justify-center h-auto w-auto'>
      <header className='bg-header'>
        <nav className='p-6 mx-auto justify-between max-w-screen-xl'>
          <div className='flow-root ml-4 mt-2'>
            <div className='flex justify-center place-content-center rounded-full'>
              <Link href='/'>
                <a className='max-w-md rounded-full drop-shadow-xl'>
                  <Image src={BirbBanner} className='rounded-full' alt='KweenBirb header banner'></Image>
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <div className='flex shrink justify-center w-auto'>
        <div className='object-scale-down bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-900 p-4 sm:p-6 shadow-2xl rounded-full border-4 border-indigo-400'>
          <div className='flex whitespace-nowrap justify-items-stretch p-1 text-[13px] sm:text-lg space-x-4 sm:space-x-10 w-auto text-white font-bold'>
            <Link href="/">
              <a className="nav-link hover:underline">Home</a>
            </Link>
            <Link href='/about'>
              <a className='nav-link hover:underline'>About</a>
            </Link>
            <Link href='https://mirror.xyz/0x65b54a4646369d8ad83cb58a5a6b39f22fcd8cee'>
              <a className='nav-link hover:underline'>Blog</a>
            </Link>
            <Link href='/nft'>
              <a className='nav-link hover:underline'>Custom NFTs</a>
            </Link>
            <Link href='/stablediffusion'>
              <a className='nav-link hover:underline'>AI Images</a>
            </Link>
            <Link href='/chatbot'>
              <a className='nav-link hover:underline'>AI Chat</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}