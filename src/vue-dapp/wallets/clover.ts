import { CloverConnector } from '@clover-network/clover-connector'
const clover = new CloverConnector({ supportedChainIds: [1] })
async function CloverProvider() {
    return await clover.getProvider()
}

export { CloverProvider }

export class CloverConnect {
  static async connect() {
    const address = await clover.getAccount()
    console.log(address);
    
    let Provider = await clover.getProvider()
    return Provider
  }
}

  