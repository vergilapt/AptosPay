export const transferPayloadToV2 = (payload: any): any => {
  if (payload.arguments) {
    return {
      function: payload.function,
      functionArguments: payload.arguments,
      typeArguments: payload.type_arguments,
    };
  }

  if (payload.functionArguments) {
    return payload;
  }

  return null;
};

