# openapi-remote-codegen

TypeScript CLI and library that generates type-safe SvelteKit remote functions from OpenAPI specs annotated with `x-remote-*` extensions.

## Installation

```bash
npm install -D openapi-remote-codegen
```

## Zero-Config Usage

If your OpenAPI spec lives at `./openapi.json`, just run:

```bash
npx openapi-remote-codegen
```

The generator reads the spec, finds operations annotated with `x-remote-type`, and writes generated files to `./src/lib/api/generated/`.

## Configuration

Create a `remote-codegen.config.ts` (or `.js` / `.mjs`) in your project root:

```ts
import { defineConfig } from 'openapi-remote-codegen/config';

export default defineConfig({
  openApiPath: './openapi.json',
  outputDir: './src/lib',
});
```

### Config Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `openApiPath` | `string` | `'./openapi.json'` | Path to the OpenAPI spec JSON file |
| `outputDir` | `string` | `'./src/lib'` | Base output directory for generated files |
| `remoteFunctionsOutput` | `string` | `'api/generated'` | Subdirectory within `outputDir` for remote function files |
| `apiClientOutput` | `string` | `'api/api-client.generated.ts'` | Path within `outputDir` for the ApiClient wrapper |
| `clientAccess` | `string` | `'getRequestEvent().locals.apiClient'` | Expression to access the API client in generated functions |
| `nswagClientPath` | `string` | `'./generated/api-client'` | Path to the NSwag-generated client module |
| `dateTimeType` | `'Date' \| 'string'` | `'Date'` | How the client represents `format: date-time`; match NSwag's own `dateTimeType` (see below) |
| `typedSchemas` | `boolean` | `false` | The Zod schemas are typed to the API types, so bodies reach the client uncast (see below) |
| `imports` | `ImportPaths` | See below | Module paths used in generated `import` statements |
| `errorHandling` | `ErrorHandling` | See below | Templates for generated `catch` blocks |

### `imports`

| Key | Default | Description |
|-----|---------|-------------|
| `server` | `'$app/server'` | Module providing `query`, `command`, `form`, `getRequestEvent` |
| `kit` | `'@sveltejs/kit'` | Module providing `error`, `redirect` |
| `schemas` | `'$lib/api/generated/schemas'` | Module providing Zod schemas |
| `apiTypes` | `'$api'` | Module providing API types and enums |
| `zod` | `'zod'` | Zod module |

### `errorHandling`

| Key | Default | Description |
|-----|---------|-------------|
| `on401` | Redirect to `/auth/login` | Code to execute on 401 (has access to `url`) |
| `on403` | `error(403, remoteErrorMessage(err, 'Forbidden'))` | Code to execute on 403 |
| `on500` | `translateRemoteError(err, 'Failed to ...')` | Function taking a human-readable name, returns code for every other status |
| `forwardStatuses` | `[400, 409, 429]` | Statuses `translateRemoteError` rethrows as themselves rather than as a 500 |
| `imports` | `[]` | Import lines emitted into every remote file, for helpers the arms call |

`remoteErrorMessage` and `translateRemoteError` come from `remote-error.generated.ts`,
emitted next to the remote functions and imported automatically by any arm that calls
them. They read the server's own reason out of the thrown value — a generated HTTP
client hands the response body over unparsed, and puts a fixed string of its own in
`message` — trying each place the body might be (`result`, `response`, `body`) and
preferring, within one, `errors` (flattened), `error`, `detail`, `title`, `message`.
`translateRemoteError` passes that reason on only with a forwarded status; every other
status collapses to a 500 carrying the arm's fallback, so a failure the API did not
write for the user cannot narrate itself to them. Overriding both arms with code that
calls neither helper suppresses the module.

### `dateTimeType`

Set it to the NSwag client's `dateTimeType`. With `'Date'`, date-time parameters are
validated with `z.coerce.date()` and handed to the client as a `Date`. With `'string'`,
they are validated with `z.iso.datetime({ offset: true })` and handed on as the ISO text
the caller sent, so the client's `"" + value` query concatenation carries ISO 8601 rather
than `Date#toString()`. `'string'` needs Zod 4. It shapes inline request bodies too
(`Guid[]`-style arrays and dictionaries of date-times).

### `typedSchemas`

Turn it on when every schema in `imports.schemas` has the output type of the API type
it validates, e.g. `FooSchema = z.object({...}) satisfies z.ZodType<Foo>`. Request bodies
then reach the client as `request` rather than `request as Foo`, and `form()` schemas go
through a `formCoerce` typed to the schema's output rather than `formCoerce(FooSchema) as
any`, so a form handler's argument is typed. An omitted optional body is still replaced
with `{}` and cast, because the client's type may require fields an empty body lacks.
Leave it off for schemas that infer `unknown`, such as `z.fromJSONSchema()` output: with it
on, any schema whose output differs from its API type becomes a type error at the call.

### Upgrading to 0.8.0

Output changes for every project, whatever the config:

- A query whose params include a required one takes a **required** params object and
  reads `params.x`. Earlier versions made the object optional and read `params?.x`, which handed
  `undefined` to a client parameter typed as required. A caller that omitted the object
  for such a query now fails to type-check, as it would have failed at the server.
- `error` and `redirect` are imported from `imports.kit` only by files that call them.
  Command- and form-only files no longer import an unused `redirect`.
- DTO types are imported only when the file names them.

`dateTimeType` and `typedSchemas` are new and default to the 0.7.0 behaviour.

### Upgrading to 0.7.0

The **default** `on500` changed. 0.6.0 collapsed every non-401/403 status into
`error(500, 'Failed to X')`; 0.7.0 rethrows `forwardStatuses` (400, 409, 429) under
their own status with the message the response body carried, and the default `on403`
now carries the body's reason rather than a bare `'Forbidden'`.

Projects that override both `on403` and `on500` keep the output they had, with one
exception: operations that generate a raw fetch (file uploads and
`application/x-www-form-urlencoded`) now put the response body on the thrown error as
`err.response`, and their `console.error` label names the client method rather than the
exported function name.

`@sveltejs/kit` is a peer dependency from 0.7.0 — the emitted module imports `error`
from it, and relies on it throwing.

## CLI Flags

```bash
npx openapi-remote-codegen [options]

Options:
  --config <path>    Path to config file (skips auto-discovery)
```

### Config File Discovery

When `--config` is not provided, the CLI looks for these files in the current directory (first match wins):

1. `remote-codegen.config.ts`
2. `remote-codegen.config.js`
3. `remote-codegen.config.mjs`

If none are found, all defaults apply.

## Generated Output

The generator produces one file per OpenAPI tag (e.g., `foods.generated.remote.ts`) plus an `index.ts` barrel export, an `api-client.generated.ts` wrapper, and the shared modules the output needs (`remote-error.generated.ts`, and `form-utils.generated.ts` / `invalidation.generated.ts` when forms or invalidation are in play). Files a run no longer emits are deleted from the remote functions directory: any `*.generated.remote.ts`, plus those three shared modules by name. Nothing else is touched, so an output directory shared with other generators is safe.

### Example: Query

```ts
// foods.generated.remote.ts
import { query, getRequestEvent } from '$app/server';
import { error, redirect } from '@sveltejs/kit';
import { remoteErrorMessage, translateRemoteError } from './remote-error.generated.js';

export const getFavorites = query(async () => {
  try {
    const apiClient = getRequestEvent().locals.apiClient;
    return await apiClient.foodsV4.getFavorites();
  } catch (err) {
    const status = (err as any)?.status;
    if (status === 401) { /* redirect to login */ }
    if (status === 403) throw error(403, remoteErrorMessage(err, 'Forbidden'));
    throw translateRemoteError(err, 'Failed to get favorites');
  }
});
```

### Example: Command with Invalidation

```ts
export const createFood = command(async (data: CreateFoodDto) => {
  try {
    const apiClient = getRequestEvent().locals.apiClient;
    return await apiClient.foodsV4.createFood(data);
  } catch (err) {
    // ... error handling
  }
}, { invalidates: [getFavorites] });
```

### Example: File Upload

Operations whose request body is `multipart/form-data` carrying an `IFormFile` always
generate a `form()` remote, whatever `x-remote-type` they declare. A `command()` cannot
carry a file: its arguments are devalue-serialised, and devalue throws on a `File` in the
browser before any request is sent. Callers submit a `<form>` with a file input named
after the field (`file` by default).

```ts
export const upload = form('unchecked', async (data: { file?: File }) => {
  const apiClient = getRequestEvent().locals.apiClient;
  const submitted = data.file;
  if (!submitted) throw error(400, 'No file was submitted');
  // A submitted file arrives as SvelteKit's lazy proxy, which multipart encoders
  // reject; read it into a real File before attaching it.
  const file = new File([await submitted.arrayBuffer()], submitted.name, { type: submitted.type });
  // ... builds FormData and POSTs it through the API client's HTTP client
});
```

```svelte
<form {...upload}>
  <input type="file" name="file" />
  <button>Upload</button>
</form>
```

## Programmatic API

The package also exports its core pipeline for integration into build tools or custom workflows:

```ts
import {
  parseOpenApiSpec,
  generateRemoteFunctions,
  generateApiClient,
  resolveConfig,
  defineConfig,
} from 'openapi-remote-codegen';
```

```ts
import { readFileSync } from 'fs';
import { resolveConfig, parseOpenApiSpec, generateRemoteFunctions } from 'openapi-remote-codegen';

const config = resolveConfig({ openApiPath: './my-spec.json' });
const spec = JSON.parse(readFileSync(config.openApiPath, 'utf-8'));
const parsed = parseOpenApiSpec(spec, { dateTimeType: config.dateTimeType });
const files = generateRemoteFunctions(parsed, config);

for (const [fileName, content] of files) {
  console.log(fileName, content.length);
}
```

### Exported Types

```ts
import type {
  GeneratorConfig,
  UserConfig,
  ImportPaths,
  ErrorHandling,
  DateTimeType,
  ParsedSpec,
  OperationInfo,
  ParameterInfo,
  RemoteType,
} from 'openapi-remote-codegen';
```

## How It Works

1. **Parse** -- The OpenAPI JSON spec is read and scanned for operations containing `x-remote-type` extension data.
2. **Classify** -- Each annotated operation is classified as a `query`, `command`, or `form` and its parameters, request body schema, and response type are extracted.
3. **Generate** -- Operations are grouped by tag. For each tag, a `.generated.remote.ts` file is emitted with typed wrapper functions. An `ApiClient` wrapper and barrel `index.ts` are also generated.
4. **Write** -- Files are written to the configured output directory. Previously generated files that no longer correspond to a tag are removed.

## License

MIT
