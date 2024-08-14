import { Project, InterfaceDeclaration, PropertySignature, Type } from 'ts-morph';
import { writeFileSync } from 'fs';

interface JsonSchemaProperty {
  type: string;
  properties?: Record<string, JsonSchemaProperty>;
  items?: JsonSchemaProperty;
  description?: string;
  required?: string[];
  enum?: string[];
  $ref?: string;
  oneOf?: JsonSchemaProperty[];
}

const project = new Project();
const sourceFile = project.addSourceFileAtPath(`${__dirname}/spec.ts`);

const definitions: Record<string, any> = {};

// Function to generate JSON schema from TypeScript type
function generateJsonSchemaForType(type: Type, visitedTypes: Set<string> = new Set()): any {
  const typeName = type.getText();

  // Prevent infinite recursion by checking if the type is already being processed
  if (type.isInterface() && visitedTypes.has(typeName)) {
    if (typeName.endsWith('[]')) {
      return {
        type: 'array',
        items: {
          $ref: `#/definitions/${typeName.slice(0, -2)}`,
        },
      };
    }
    return { $ref: `#/definitions/${typeName}` };
  }

  // Add the current type to the set of visited types
  visitedTypes.add(typeName);

  if (type.isString()) {
    return { type: 'string' };
  } else if (type.isNumber()) {
    return { type: 'number' };
  } else if (type.isBoolean()) {
    return { type: 'boolean' };
  } else if (type.isArray()) {
    return {
      type: 'array',
      items: generateJsonSchemaForType(type.getArrayElementTypeOrThrow(), visitedTypes),
    };
  } else if (type.isEnum()) {
    return {
      type: 'string',
      enum: type.getUnionTypes().map((unionType) => unionType.getLiteralValue()),
    };
  } else if (type.isStringLiteral()) {
    return {
      type: 'string',
      enum: [type.getLiteralValue()],
    };
  } else if (type.isNumberLiteral()) {
    return {
      type: 'number',
      enum: [type.getLiteralValue()],
    };
  } else if (type.isBooleanLiteral()) {
    return {
      type: 'boolean',
      enum: [type.getLiteralValue()],
    };
  } else if (type.isUnion()) {
    return {
      oneOf: type
        .getUnionTypes()
        .map((unionType) => generateJsonSchemaForType(unionType, visitedTypes)),
    };
  } else if (type.isIntersection()) {
    return { type: 'object', properties: processUnionOrIntersectionType(type, visitedTypes) };
  } else if (type.getText() === 'any') {
    return { type: 'any' };
  } else {
    return processObjectType(type, visitedTypes);
  }
}

// Process types that are objects or interfaces
function processObjectType(type: Type, visitedTypes: Set<string>): any {
  const properties: Record<string, JsonSchemaProperty> = {};
  const required: string[] = [];
  type.getProperties().forEach((prop) => {
    const propType = prop.getDeclarations()[0]?.getType();
    const propName = prop.getName();
    const isOptional =
      (prop.getDeclarations()[0] as PropertySignature)?.hasQuestionToken?.() || false;
    if (propType) {
      properties[propName] = generateJsonSchemaForType(propType, visitedTypes);
      if (!isOptional) required.push(propName);
    }
  });

  if (type.isInterface()) {
    const symbol = type.getSymbol();
    if (symbol) {
      const symbolName = symbol.getName();
      if (!definitions[symbolName]) {
        definitions[symbolName] = {
          type: 'object',
          properties,
          required: required.length ? required : undefined,
        };
      }
      if (symbolName.endsWith('[]')) {
        return {
          type: 'array',
          items: {
            $ref: `#/definitions/${symbolName.slice(0, -2)}`,
          },
        };
      }
      return {
        $ref: `#/definitions/${symbolName}`,
      };
    }
  }

  return {
    type: 'object',
    properties,
    required: required.length ? required : undefined,
  };
}

// Handle union or intersection types specifically
function processUnionOrIntersectionType(type: Type, visitedTypes: Set<string>): any {
  const properties: Record<string, JsonSchemaProperty> = {};
  type.getUnionTypes().forEach((subType) => {
    const subProps = processObjectType(subType, visitedTypes);
    Object.assign(properties, subProps.properties);
  });
  return properties;
}

// Recursive function to generate JSON schema for an interface
function generateJsonSchema(interfaceDecl: InterfaceDeclaration): any {
  const properties: Record<string, JsonSchemaProperty> = {};
  const required: string[] = [];
  const visitedTypes = new Set<string>();

  interfaceDecl.getProperties().forEach((property: PropertySignature) => {
    const propName = property.getName();
    const propType = property.getType();
    const isOptional = property.hasQuestionToken();

    properties[propName] = generateJsonSchemaForType(propType, visitedTypes);
    if (!isOptional) {
      required.push(propName);
    }
  });

  return {
    type: 'object',
    properties,
    required: required.length > 0 ? required : undefined,
  };
}

const specInterface = sourceFile.getInterface('ISpec');
if (specInterface) {
  const jsonSchema = generateJsonSchema(specInterface);
  writeFileSync(
    `${__dirname}/schema.json`,
    JSON.stringify({ ...jsonSchema, definitions }, null, 2),
  );
} else {
  console.error("Interface 'ISpec' not found.");
}
