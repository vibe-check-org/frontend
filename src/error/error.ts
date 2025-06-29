export type GraphQLErrorEntry = {
  message: string;
  path?: readonly (string | number)[];
  extensions?: Record<string, unknown>;
};
