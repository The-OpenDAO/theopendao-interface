export function getImageUrl(name: string) {
  return new URL(`/src/assets/images/exchange/${name}.png`, import.meta.url).href
}

export const list = [
  {
    name: 'Sushiswap',
    url: 'https://app.sushi.com/swap?outputCurrency=0x3b484b82567a09e2588a13d54d032153f0c0aee0&inputCurrency=ETH',
  },
  {
    name: 'Uniswap',
    url: 'https://app.uniswap.org/#/swap?outputCurrency=0x3b484b82567a09e2588a13d54d032153f0c0aee0&inputCurrency=ETH',
  },
  {
    name: 'DODO',
    url: 'https://app.dodoex.io/exchange/ETH-SOS?network=mainnet',
  },
  {
    name: 'OKEx',
    url: 'https://www.okex.com/trade-spot/sos-usdt',
  },
  {
    name: 'Huobi',
    url: 'https://www.huobi.com/en-us/exchange/sos_usdt',
  },
  {
    name: 'KuCoin',
    url: 'https://trade.kucoin.com/SOS-USDT',
  },
  {
    name: 'FTX',
    url: 'https://ftx.com/trade/SOS/USD',
  },
  {
    name: 'BitForex',
    url: 'https://www.bitforex.com/en/spot/sos_usdt',
  },
  {
    name: 'Gate.io',
    url: 'https://www.gate.io/cn/trade/sos_usdt',
  },
  {
    name: 'Bybit',
    url: 'https://www.bybit.com/app/exchange/SOSUSDT',
  },
  {
    name: 'MEXC',
    url: 'https://www.mexc.com/exchange/SOS_USDT',
  },

  {
    name: 'Bitget',
    url: 'https://www.bitget.com/en/swap/cmt_sosusdt',
  },

  {
    name: 'BKEX',
    url: 'https://www.bkex.com/trade/SOS_USDT',
  },

  {
    name: 'Hoo',
    url: 'https://hoo.com/transit/spot/sos-usdt',
  },
  {
    name: 'Hotbit',
    url: 'https://www.hotbit.io/exchange?symbol=SOS_USDT',
  },
  {
    name: 'AscendEX',
    url: 'https://ascendex.com/en/cashtrade-spottrading/usdt/sos',
  },
  {
    name: 'DigiFinex',
    url: 'https://www.digifinex.com/en-ww/trade/USDT/SOS',
  },

  {
    name: 'BitMart',
    url: 'https://www.bitmart.com/trade/en?symbol=SOS_USDT',
  },
  {
    name: 'Poloniex',
    url: 'https://poloniex.com/exchange/USDT_SOS',
  },

  {
    name: 'LBank',
    url: 'https://www.lbank.info/exchange/sos/usdt',
  },
  {
    name: 'XT.COM',
    url: 'https://www.xt.com/trade/sos_usdt',
  },
]
