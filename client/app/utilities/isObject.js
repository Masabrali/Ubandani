export default function isObject(obj) {
    return (!!obj && (obj instanceof Object || typeof obj === "object"));
}
