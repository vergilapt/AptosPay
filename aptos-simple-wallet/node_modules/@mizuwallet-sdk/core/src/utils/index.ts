export const payloadRebuild = (payload: any) => {
  return {
    function: payload.function,
    functionArguments: payload.functionArguments || payload.arguments,
    typeArguments: payload.typeArguments || payload.type_arguments,
  };
};
