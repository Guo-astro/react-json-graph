import {
  type JsonTree,
  JsonDataType,
} from "../components/JsonGraph/Nodes/json.types";
import type { CustomNode } from "../components/JsonGraph/Nodes/node.types";
import { FileFormat } from "../constants/json.constants";
import { jsonParser } from "./json-parser.utiils";
import { getLayoutedNodes } from "./graph.utils";
import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
} from "./utils";

export const contentToJson = async (
  value: string,
  format = FileFormat.JSON
): Promise<object> => {
  let json: object = {};

  if (format === FileFormat.JSON) json = JSON.parse(value);

  if (!json) throw Error("Invalid JSON!");

  return Promise.resolve(json);
};

export const jsonToContent = async (
  json: object,
  format: FileFormat
): Promise<string> => {
  let contents: string = "";

  if (format === FileFormat.JSON) {
    contents = JSON.stringify(json, null, 2);
  }

  return Promise.resolve(contents);
};

export function convertJsonTree(json: object | unknown[]): JsonTree {
  const { nodes, edges } = jsonParser(json);
  const layoutedSeaNodes: CustomNode[] = getLayoutedNodes(nodes, edges);

  return {
    nodes: layoutedSeaNodes,
    edges,
  };
}

export function validateJsonDataType(v: unknown): {
  [P in keyof typeof JsonDataType as `is${P}Data`]: boolean;
} & {
  isPrimitiveData: boolean;
} {
  const isStringData: boolean = isString(v);
  const isNumberData: boolean = isNumber(v);
  const isBooleanData: boolean = isBoolean(v);
  const isNullData: boolean = isNull(v);
  const isObjectData: boolean = isObject(v);
  const isArrayData: boolean = isArray(v);

  const isPrimitiveData =
    isStringData || isNumberData || isBooleanData || isNullData;

  return {
    isObjectData,
    isArrayData,
    isStringData,
    isNumberData,
    isBooleanData,
    isNullData,
    isPrimitiveData,
  };
}

export function getJsonDataType(v: unknown): JsonDataType {
  const {
    isObjectData,
    isArrayData,
    isStringData,
    isNumberData,
    isBooleanData,
  } = validateJsonDataType(v);

  if (isObjectData) {
    return JsonDataType.Object;
  }
  if (isArrayData) {
    return JsonDataType.Array;
  }
  if (isStringData) {
    return JsonDataType.String;
  }
  if (isNumberData) {
    return JsonDataType.Number;
  }
  if (isBooleanData) {
    return JsonDataType.Boolean;
  }
  return JsonDataType.Null;
}
