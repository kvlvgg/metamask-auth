export default function Observable<C extends Record<string, (...args: any[]) => void>>(): {
    new (): {};
    subscribers: Record<keyof C, C[keyof C][]>;
    emit<T extends keyof C>(event: T, ...args: Parameters<C[T]>): void;
    on<T_1 extends keyof C>(event: T_1, listener: C[T_1]): void;
    off<T_2 extends keyof C>(event: T_2, listener: C[T_2]): void;
};
