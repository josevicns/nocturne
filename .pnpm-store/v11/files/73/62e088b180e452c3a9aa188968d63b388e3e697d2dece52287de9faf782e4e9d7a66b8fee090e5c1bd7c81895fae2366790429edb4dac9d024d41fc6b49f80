// deno-fmt-ignore-file
const identifier = 'external_';
let resetCount = 0;
const state = {
    identifier: `${identifier}${resetCount}`,
    variables: []
};
// ------------------------------------------------------------------
// ResetExternals
//
// Each reset results in a new external group identifier. This is done 
// to prevent variable name overlap when generating and evaluating
// multiple types in the same scope.
//
// ------------------------------------------------------------------
export function ResetExternal() {
    state.identifier = `${identifier}${resetCount}`;
    state.variables = [];
    resetCount += 1;
}
// ------------------------------------------------------------------
// CreateVariable
// ------------------------------------------------------------------
export function CreateVariable(value) {
    const call = `${state.identifier}[${state.variables.length}]`;
    state.variables.push(value);
    return call;
}
// ------------------------------------------------------------------
// GetExternals
// ------------------------------------------------------------------
export function GetExternal() {
    return state;
}
