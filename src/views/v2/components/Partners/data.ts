export function getImageUrl(name) {
  return new URL(`/src/assets/images/partners/partner-${name}`, import.meta.url).href
}

export const list = [
  {
    img: 'chain.svg',
    url: 'https://chain.link/',
  },
  {
    img: '4.png',
    url: 'https://shopping.io/',
  },
  {
    img: 'celer-network.svg',
    url: 'https://www.celer.network/',
  },
  {
    img: 'clover.svg',
    url: 'https://clover.finance/',
  },
  {
    img: 'wintermute.svg',
    url: 'https://www.wintermute.com/',
  },
  {
    img: 'crypto-com.svg',
    url: 'https://crypto.com/sg/',
  },
  {
    img: 'mask-network.svg',
    url: 'https://mask.io/',
  },
  {
    img: 'polygon-network.svg',
    url: 'https://polygon.technology/',
  },
]
