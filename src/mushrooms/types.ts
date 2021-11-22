import Zdog from 'zdog'

type TokenData = {
    hash: string
}

declare global {
    const Zdog: typeof Zdog

    const tokenData: TokenData

    interface Window {
        mshrm:any;
        tokenData: TokenData
    }

}
