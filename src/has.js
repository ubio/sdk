export default function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
