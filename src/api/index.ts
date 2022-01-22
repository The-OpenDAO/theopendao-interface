import axios from 'axios'

export async function getMarketInfo() {
  const res = await axios.get(
    'https://api.coingecko.com/api/v3/coins/opendao?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
  )
  return res.data
}

export async function getTotalVolume() {
  const res = await axios.get(
    'https://api.coingecko.com/api/v3/coins/ethereum/contract/0x3b484b82567a09e2588a13d54d032153f0c0aee0/market_chart/range?vs_currency=usd&from=1640275200&to=1924272000'
  )
  let totalVolume = 0
  res.data.total_volumes.forEach(element => {
    totalVolume += element[1]
  })
  return parseInt(totalVolume)
}

export async function getMembershipProofAPI(address: string) {
  address = address.toLowerCase()
  const fileName = address.substring(0, 4)
  const res = await axios.get(`${location.origin}/membership/${fileName}.json`)
  return res.data[address] || {}
}
