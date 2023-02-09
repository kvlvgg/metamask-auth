export default function Observable<C extends Record<string, (...args: any[]) => void>>() {
  return class Observable {
    static subscribers = {} as Record<keyof C, C[keyof C][]>;

    public static emit<T extends keyof C>(event: T, ...args: Parameters<C[T]>) {
      this.subscribers[event]?.forEach((listener) => listener(...args));
    }

    public static on<T extends keyof C>(event: T, listener: C[T]) {
      if (!Array.isArray(this.subscribers[event])) this.subscribers[event] = [listener];
      else this.subscribers[event]?.push(listener);
    }

    public static off<T extends keyof C>(event: T, listener: C[T]) {
      const index = this.subscribers[event]?.findIndex((x) => x === listener) ?? -1;
      if (index === -1) return;

      this.subscribers[event]?.splice(index, 1);
    }
  };
}
