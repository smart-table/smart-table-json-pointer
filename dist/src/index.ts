interface JSONPointer {
    get<T>(target?: T): any;

    set<T>(target: T, newTree: any): T;
}


export default function pointer(path: string): JSONPointer {
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
        current[leaf] = Object.assign(current[leaf] || {}, newTree);
        return target;
    };

    return {
        get<T>(target: T) {
            return partial(target, [...parts]);
        },
        set
    };
}
