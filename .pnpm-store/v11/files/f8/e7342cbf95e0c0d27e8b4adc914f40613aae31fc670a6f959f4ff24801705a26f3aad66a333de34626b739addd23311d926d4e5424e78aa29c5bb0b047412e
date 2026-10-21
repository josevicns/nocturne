#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { pathToFileURL } from 'url';
import { resolveConfig, type UserConfig } from './config.js';
import { parseOpenApiSpec } from './parser.js';
import { generateRemoteFunctions } from './generators/remote-functions.js';
import { generateApiClient } from './generators/api-client.js';
import { pruneStaleGeneratedFiles } from './utils/output.js';

async function loadConfig(): Promise<UserConfig> {
  const configNames = [
    'remote-codegen.config.ts',
    'remote-codegen.config.js',
    'remote-codegen.config.mjs',
  ];

  // Check for --config flag
  const configFlagIndex = process.argv.indexOf('--config');
  if (configFlagIndex !== -1 && process.argv[configFlagIndex + 1]) {
    const configPath = resolve(process.cwd(), process.argv[configFlagIndex + 1]);
    if (!existsSync(configPath)) {
      console.error(`Config file not found: ${configPath}`);
      process.exit(1);
    }
    const mod = await import(pathToFileURL(configPath).href);
    return mod.default ?? mod;
  }

  // Auto-discover
  for (const name of configNames) {
    const configPath = resolve(process.cwd(), name);
    if (existsSync(configPath)) {
      console.log(`Using config: ${name}`);
      const mod = await import(pathToFileURL(configPath).href);
      return mod.default ?? mod;
    }
  }

  return {};
}

async function main() {
  const userConfig = await loadConfig();
  const config = resolveConfig(userConfig);

  console.log('OpenAPI Remote Function Generator');
  console.log('=================================\n');

  const specPath = resolve(process.cwd(), config.openApiPath);
  if (!existsSync(specPath)) {
    console.error(`OpenAPI spec not found: ${specPath}`);
    process.exit(1);
  }

  const spec = JSON.parse(readFileSync(specPath, 'utf-8'));
  console.log(`Loaded OpenAPI spec: ${spec.info?.title ?? 'unknown'} v${spec.info?.version ?? 'unknown'}`);

  const parsed = parseOpenApiSpec(spec, { dateTimeType: config.dateTimeType });
  console.log(`Found ${parsed.operations.length} annotated operations across ${parsed.tags.length} tags.\n`);

  if (parsed.operations.length === 0) {
    console.log('No operations with x-remote-* extensions found.');
    console.log('Add x-remote-type to your OpenAPI operations, or use the companion attributes package.');
    process.exit(0);
  }

  // Generate remote functions
  console.log('Generating remote functions...');
  const remoteFunctions = generateRemoteFunctions(parsed, config);

  const remoteFunctionsDir = resolve(config.outputDir, config.remoteFunctionsOutput);
  mkdirSync(remoteFunctionsDir, { recursive: true });

  for (const removed of pruneStaleGeneratedFiles(remoteFunctionsDir, remoteFunctions.keys())) {
    console.log(`  Removed stale: ${config.remoteFunctionsOutput}/${removed}`);
  }

  for (const [fileName, content] of remoteFunctions) {
    const filePath = resolve(remoteFunctionsDir, fileName);
    writeFileSync(filePath, content, 'utf-8');
    console.log(`  Generated: ${config.remoteFunctionsOutput}/${fileName}`);
  }

  // Generate ApiClient
  console.log('\nGenerating ApiClient...');
  const apiClientContent = generateApiClient(spec, config);
  const apiClientPath = resolve(config.outputDir, config.apiClientOutput);
  mkdirSync(dirname(apiClientPath), { recursive: true });
  writeFileSync(apiClientPath, apiClientContent, 'utf-8');
  console.log(`  Generated: ${config.apiClientOutput}`);

  console.log('\nDone!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
