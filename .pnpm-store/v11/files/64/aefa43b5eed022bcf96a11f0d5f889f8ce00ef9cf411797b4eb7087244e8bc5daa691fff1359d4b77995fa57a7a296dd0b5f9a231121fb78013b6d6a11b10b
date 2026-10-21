/**
 * Stand-in for `@sveltejs/kit`'s `error()`: the real one throws an HttpError, and
 * the generated module's import path is configurable, so the emitted code can be
 * exercised without SvelteKit installed.
 */
export function error(status: number, body: string | { message: string }): never {
  throw { status, body: typeof body === 'string' ? { message: body } : body };
}
