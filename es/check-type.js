function checkType(data, type) {
    return Object.prototype.toString.call(data).indexOf(type) >= 0;
}
function isArray(data) {
    return checkType(data, 'Array');
}
function isBoolean(data) {
    return checkType(data, 'Boolean');
}
function isNull(data) {
    return checkType(data, 'Null');
}
function isNumber(data) {
    return checkType(data, 'Number');
}
function isString(data) {
    return checkType(data, 'String');
}
function isUndefined(data) {
    return checkType(data, 'Undefined');
}
function isSymbol(data) {
    return checkType(data, 'Symbol');
}
function isObject(data) {
    return checkType(data, 'Object');
}
function isRegExp(data) {
    return checkType(data, 'RegExp');
}
function isDate(data) {
    return checkType(data, 'Date');
}
function isFunction(data) {
    return checkType(data, 'Function');
}
function isError(data) {
    return checkType(data, 'Error');
}
const isNullOrUndefined = (data) => {
    return checkType(data, 'Null') || checkType(data, 'Undefined');
};
const isPrimitive = (data) => {
    const primitiveTypes = [
        'Undefined',
        'Null',
        'Boolean',
        'Number',
        'String',
    ];
    return primitiveTypes.some((type) => checkType(data, type));
};
export { isArray, isBoolean, isNull, isNumber, isString, isUndefined, isSymbol, isObject, isRegExp, isDate, isFunction, isError, isNullOrUndefined, isPrimitive, };
