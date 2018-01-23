'use strict';

function pointer(path) {
	const parts = path.split('.');

	function partial(obj = {}, parts = []) {
		const p = parts.shift();
		const current = obj[p];
		return (current === undefined || parts.length === 0) ?
			current : partial(current, parts);
	}

	function set(target, newTree) {
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
	}

	return {
		get(target) {
			return partial(target, [...parts]);
		},
		set
	};
}

module.exports = pointer;
