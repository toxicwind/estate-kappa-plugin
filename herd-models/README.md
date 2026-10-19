# Herd Models Plugin (`estate/herd-models`)

Connects local llama-server instances managed by Herd directly into `kappa` as dynamic model providers.

## Service Connection
- **Default Endpoint**: `http://127.0.0.1:25100` (Pitchfork daemon: `herd`)
- **Override**: `HERD_URL`

## Behavior
Queries Herd's `/v1/models` endpoint dynamically to register live local GGUF models (e.g. `beellama/exaone-4-0-1-2b-iq4xs`).

## Verification
```bash
bun test .kilo/plugin/herd-models/index.test.ts
```
