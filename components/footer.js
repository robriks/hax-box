import Image from 'next/image';
import githubLogo from '../public/github-logo.png';
import twitterLogo from '../public/twitter-logo.png';
import instagramLogo from '../public/instagram-logo.png';

export default function Footer() {
    return (
        <div className='justify-center h-auto w-auto'>
            <div className='flex justify-center text-xs font-bold'>Contact:</div>

            <div className='flex justify-center'>
                <div className='p-4'> 
                    <a
                        href='https://github.com/robriks/HuskyCoin'>
                        <Image
                            src={githubLogo}
                        />
                    </a>
                </div>
                <div className='p-4'>
                    <a
                        href='https://twitter.com/marsterlund'>
                        <Image
                            src={twitterLogo}
                        />
                    </a>
                </div>
                <div className='p-4'>
                    <a
                        href='https://instagram.com/marsterlund'>
                        <Image
                            src={instagramLogo}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}