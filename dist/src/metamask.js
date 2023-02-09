import Web3 from "web3";
import { METAMASK_STATUSES as STATUSES, METAMASK_ERRORS as ERRORS, METAMASK_MESSAGES as MESSAGES } from "./constants";
import Observable from "./observable";
export default class MetaMask extends Observable() {
    static isFirstTimeInit = true;
    static get isWeb3Installed() {
        return !!window.ethereum && !!window.ethereum.isMetaMask;
    }
    static async init(requestAccount) {
        this.setWeb3GlobalVars();
        if (!this.isWeb3Installed) {
            this.emit("message", MESSAGES.NOT_INSTALLED);
            this.emit("status", STATUSES.NOT_INSTALLED);
            return;
        }
        this.emit("message", MESSAGES.CONNECTING);
        this.emit("status", STATUSES.CONNECTING);
        let account = await this.getAccount();
        if (!account && requestAccount)
            account = await this.requestAccount();
        if (!account) {
            this.emit("message", MESSAGES.NOT_CONNECTED);
            this.emit("status", STATUSES.NOT_CONNECTED);
            return;
        }
        const { type, netId } = await this.getNet();
        if (this.isFirstTimeInit)
            this.bindEventListeners();
        this.isFirstTimeInit = false;
        this.emit("connected", account, netId, type);
        this.emit("message", MESSAGES.CONNECTED);
        this.emit("status", STATUSES.CONNECTED);
    }
    static async sign(nonce) {
        const coinbase = await window.web3.eth.getCoinbase();
        const signature = await window.web3.eth.personal.sign(`Signing your authentication nonce: ${nonce}`, coinbase, "");
        this.emit("signed", signature);
        return signature;
    }
    static setWeb3GlobalVars() {
        if (!window.ethereum || !window.web3) {
            return;
        }
        if (!window.ethereum && window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            return;
        }
        window.web3 = new Web3(window.ethereum);
    }
    static async getAccount() {
        const [account] = (await window.ethereum.request({ method: "eth_accounts" }));
        return account ?? null;
    }
    static async requestAccount() {
        try {
            const [account] = (await window.ethereum.request({ method: "eth_requestAccounts" }));
            return account ?? null;
        }
        catch (err) {
            if (err.code === 4001) {
                this.emit("message", MESSAGES.USER_REJECTED_THE_REQUEST);
                this.emit("error", ERRORS.USER_REJECTED_THE_REQUEST);
            }
            else if (err.code === -32002) {
                this.emit("error", ERRORS.USER_REQUEST_IS_ALREADY_PENDING);
                await this.waitForAccounts();
                const [account] = (await window.ethereum.request({ method: "eth_accounts" }));
                return account ?? null;
            }
            else
                this.emit("error", ERRORS.NETWORK_ERROR);
            return null;
        }
    }
    static async getNet() {
        const netId = await window.web3.eth.net.getId();
        if (netId === 1)
            this.emit("message", MESSAGES.IN_METAMASK_MAIN_NET);
        else
            this.emit("message", MESSAGES.NOT_IN_METAMASK_MAIN_NET);
        if (netId === 1)
            return { type: "MAINNET", netId };
        if (netId === 3)
            return { type: "ROPSTEN", netId };
        if (netId === 42)
            return { type: "KOVAN", netId };
        if (netId === 4)
            return { type: "RINKEBY", netId };
        if (netId === 5)
            return { type: "GOERLI", netId };
        else
            return { type: "UNKOWN_NET", netId };
    }
    static bindEventListeners() {
        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length === 0) {
                this.emit("disconnected");
                this.emit("status", STATUSES.NOT_CONNECTED);
            }
            else {
                this.init();
            }
        });
    }
    static async waitForAccounts() {
        let accounts = [];
        while (accounts.length === 0) {
            await new Promise((resolve) => window.setTimeout(resolve, 1000));
            accounts = (await window.ethereum.request({ method: "eth_accounts" }));
        }
    }
}
