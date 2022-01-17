import axios from 'axios'
const baseURL = 'https://api.thegraph.com'
const cmcURL = 'https://pro-api.coinmarketcap.com/v1/'

export async function getData(url, query) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const data = JSON.stringify({
    query,
    variables: {},
  })

  const res = await axios.request({
    url: `${baseURL}${url}`,
    method: 'POST',
    headers,
    data,
    redirect: 'follow',
  })
  return res.data
}

//get sushiPerBlock
export function getSushiPerBlockAPI() {
  const url = '/subgraphs/name/sushiswap/master-chef'
  const query = `{\r\n  masterChef(id:"0xc2edad668740f1aa35e4d8f227fb8e17dca888cd") {\r\n    id \r\n  sushiPerBlock \r\n}\r\n}`
  return getData(url, query)
}

//  cmc key 2fd9a509-a1b2-41bd-9e70-f800928152a5
export async function getCMCdata(url, qs){
  const headers = new Headers()

  const res = await axios.request({
    method: 'GET',
    url: `${cmcURL}${url}`,
    qs,
    headers: {
      'X-CMC_PRO_API_KEY': '2fd9a509-a1b2-41bd-9e70-f800928152a5'
    },
    json: true,
    gzip: true
  })
  return res.data

}