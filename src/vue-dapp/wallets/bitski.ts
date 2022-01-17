import { Bitski } from 'bitski'
import Web3 from 'web3'
const opts = {
  clientId: '8a3708b0-73e0-46ab-b5c4-b50e4167d013',
  callbackUrl: window.location.href.split('#')[0] + 'callback.html',
  extraBitskiOptions: '',
}
const bitski = new Bitski(opts.clientId, opts.callbackUrl)
const Provider = bitski.getProvider()
const web3 = new Web3(Provider)
const BitskiProvider = web3._provider
export { bitski }
export { BitskiProvider }

export class BitskiConnect {
  static async connect() {
    await bitski.signIn()
    console.log('send object', web3)
    return web3._provider
  }
}
