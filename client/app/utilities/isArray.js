export default function isArray(arr) {
    return (!!arr && (arr instanceof Array || typeof arr === "array"));
}
