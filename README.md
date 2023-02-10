# MetaMask Auth

Simple module that eases Metamask authentication proccess

## Installation

`npm install @kvlvgg/metamask-auth`

## Usage

`import { MetaMask, Onboarding, METAMASK_STATUSES, METAMASK_MESSAGES, METAMASK_ERRORS } from 'metamask-auth';`

MetaMask is an event-based class. You can subscribe on following ones:

1. status
2. message
3. error
4. connected
5. disconnected
6. signed

For example, this is how I handle events in my vuex-store.

```
const actions: ActionTree<ModuleState, RootState> = {
  [ACTIONS.START_ONBOARDING]() {
    Onboarding.init();
  },

  [ACTIONS.INIT]({ dispatch, commit }) {
    MetaMask.on("status", (status) => commit(MUTATIONS.SET_STATUS, status));
    MetaMask.on("error", (error) => commit(MUTATIONS.SET_STATUS, error));

    MetaMask.on("connected", (account) => {
      commit(MUTATIONS.SET_METAMASK_WALLET_ADDRESS, account);
      dispatch(USER_STORE.ACTIONS.LOAD_OR_CREATE_USER, account, { root: true });
    });

    MetaMask.on("disconnected", () => {
      commit(USER_STORE.MUTATIONS.CLEAR, null, { root: true });
      commit(MUTATIONS.CLEAR_METAMASK_WALLET_ADDRESS, null);
    });

    MetaMask.on("signed", (signature) =>
      dispatch(USER_STORE.ACTIONS.AUTHENTICATE, signature, { root: true })
    );

    return MetaMask.init();
  },

  [ACTIONS.REQUEST_ACCOUNT]() {
    return MetaMask.init(true);
  },

  [ACTIONS.SIGN]({ rootGetters }) {
    const user: User | null = rootGetters[USER_STORE.GETTERS.USER];
    if (!user?.nonce) return;

    return MetaMask.sign(user.nonce);
  },
};
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## P.S

This is my first package that I publish. I am not sure if I do everything correctly.  
Don't hesitate to contact me for giving advice.
