type Data = string | number | undefined | null | boolean | object | symbol;
type PrimitiveType = 'String' | 'Number' | 'Undefined' | 'Null' | 'Boolean';
type DataType =
  | PrimitiveType
  | 'Object'
  | 'Symbol'
  | 'Array'
  | 'Function'
  | 'RegExp'
  | 'Date'
  | 'Error';

function checkType(data: Data, type: DataType): boolean {
  return Object.prototype.toString.call(data).indexOf(type) >= 0;
}

function isArray(data: Data): data is any[] {
  return checkType(data, 'Array');
}
function isBoolean(data: Data): data is boolean {
  return checkType(data, 'Boolean');
}
function isNull(data: Data): data is null {
  return checkType(data, 'Null');
}
function isNumber(data: Data): data is number {
  return checkType(data, 'Number');
}
function isString(data: Data): data is string {
  return checkType(data, 'String');
}
function isUndefined(data: Data): data is undefined {
  return checkType(data, 'Undefined');
}
function isSymbol(data: Data): data is symbol {
  return checkType(data, 'Symbol');
}
function isObject(data: Data): data is Object {
  return checkType(data, 'Object');
}
function isRegExp(data: Data): data is RegExp {
  return checkType(data, 'RegExp');
}
function isDate(data: Data): data is Date {
  return checkType(data, 'Date');
}
function isFunction(data: Data): data is Function {
  return checkType(data, 'Function');
}
function isError(data: Data): data is Error {
  return checkType(data, 'Error');
}
const isNullOrUndefined: (data: Data) => boolean = (data) => {
  return checkType(data, 'Null') || checkType(data, 'Undefined');
};
const isPrimitive: (data: Data) => boolean = (data) => {
  const primitiveTypes: Array<PrimitiveType> = [
    'Undefined',
    'Null',
    'Boolean',
    'Number',
    'String',
  ];
  return primitiveTypes.some((type) => checkType(data, type));
};

export {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isString,
  isUndefined,
  isSymbol,
  isObject,
  isRegExp,
  isDate,
  isFunction,
  isError,
  isNullOrUndefined,
  isPrimitive,
};
