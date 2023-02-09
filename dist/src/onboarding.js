import MetaMaskOnboarding from "@metamask/onboarding";
export default class Onboarding {
    static init() {
        if (MetaMaskOnboarding.isMetaMaskInstalled())
            return;
        const onboarding = new MetaMaskOnboarding();
        onboarding.startOnboarding();
    }
}
