import Web3 from "web3";
import { METAMASK_STATUSES as STATUSES, METAMASK_ERRORS as ERRORS, METAMASK_MESSAGES as MESSAGES } from "./constants";
export type MetaMaskInstance = {
    message: string;
    web3: Web3;
    type: string;
    metaMaskAddress: string;
    netId: number;
};
declare const MetaMask_base: {
    new (): {};
    subscribers: Record<"status" | "message" | "error" | "connected" | "disconnected" | "signed", (((status: (typeof STATUSES)[keyof typeof STATUSES]) => void) | ((message: (typeof MESSAGES)[keyof typeof MESSAGES]) => void) | ((error: (typeof ERRORS)[keyof typeof ERRORS]) => void) | ((account: string, netId: number, type: string) => void) | (() => void) | ((signature: string) => void))[]>;
    emit<T extends "status" | "message" | "error" | "connected" | "disconnected" | "signed">(event: T, ...args: Parameters<{
        status: (status: (typeof STATUSES)[keyof typeof STATUSES]) => void;
        message: (message: (typeof MESSAGES)[keyof typeof MESSAGES]) => void;
        error: (error: (typeof ERRORS)[keyof typeof ERRORS]) => void;
        connected: (account: string, netId: number, type: string) => void;
        disconnected: () => void;
        signed: (signature: string) => void;
    }[T]>): void;
    on<T_1 extends "status" | "message" | "error" | "connected" | "disconnected" | "signed">(event: T_1, listener: {
        status: (status: (typeof STATUSES)[keyof typeof STATUSES]) => void;
        message: (message: (typeof MESSAGES)[keyof typeof MESSAGES]) => void;
        error: (error: (typeof ERRORS)[keyof typeof ERRORS]) => void;
        connected: (account: string, netId: number, type: string) => void;
        disconnected: () => void;
        signed: (signature: string) => void;
    }[T_1]): void;
    off<T_2 extends "status" | "message" | "error" | "connected" | "disconnected" | "signed">(event: T_2, listener: {
        status: (status: (typeof STATUSES)[keyof typeof STATUSES]) => void;
        message: (message: (typeof MESSAGES)[keyof typeof MESSAGES]) => void;
        error: (error: (typeof ERRORS)[keyof typeof ERRORS]) => void;
        connected: (account: string, netId: number, type: string) => void;
        disconnected: () => void;
        signed: (signature: string) => void;
    }[T_2]): void;
};
export default class MetaMask extends MetaMask_base {
    private static isFirstTimeInit;
    private static get isWeb3Installed();
    static init(requestAccount?: boolean): Promise<void>;
    static sign(nonce: number | string): Promise<string>;
    private static setWeb3GlobalVars;
    private static getAccount;
    private static requestAccount;
    private static getNet;
    private static bindEventListeners;
    private static waitForAccounts;
}
export {};
