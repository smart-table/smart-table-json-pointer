export interface JSONPointer<T> {
    get(target?: T): any;

    set(target: T, newTree: any): T;
}


export const pointer = <T>(path: string): JSONPointer<T> => {
    const parts = path.split('.');

    const partial = (obj = {}, parts: string[] = []) => {
        const p = parts.shift();
        const current = obj[p];
        return (current === undefined || current === null || parts.length === 0) ?
            current : partial(current, parts);
    };

    const set = <T>(target: T, newTree: any) => {
        let current = target;
        const [leaf, ...intermediate] = parts.reverse();
        for (const key of intermediate.reverse()) {
            if (current[key] === undefined) {
                current[key] = {};
                current = current[key];
            }
        }

        const isEmptyObject = typeof newTree === 'object' && Object.keys(newTree).length === 0;
        current[leaf] = isEmptyObject ? {} : Object.assign(current[leaf] || {}, newTree);
        return target;
    };

    return {
        get<T>(target: T) {
            return partial(target, [...parts]);
        },
        set
    };
};
