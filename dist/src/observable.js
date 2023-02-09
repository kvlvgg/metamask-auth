export default function Observable() {
    return class Observable {
        static subscribers = {};
        static emit(event, ...args) {
            this.subscribers[event]?.forEach((listener) => listener(...args));
        }
        static on(event, listener) {
            if (!Array.isArray(this.subscribers[event]))
                this.subscribers[event] = [listener];
            else
                this.subscribers[event]?.push(listener);
        }
        static off(event, listener) {
            const index = this.subscribers[event]?.findIndex((x) => x === listener) ?? -1;
            if (index === -1)
                return;
            this.subscribers[event]?.splice(index, 1);
        }
    };
}
