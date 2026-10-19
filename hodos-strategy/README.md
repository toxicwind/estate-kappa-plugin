# Hodos Strategy Plugin (`estate/hodos-strategy`)

Exposes Hodos's model routing strategy and health metrics to the `kappa` agent runtime.

## Service Connection
- **Default Endpoint**: `http://127.0.0.1:25193` (Pitchfork daemon: `hodos`)
- **Override**: `HODOS_URL`

## Exported Tools
- `hodos_get_weights`: Query current provider weights and routing distribution.
- `hodos_query_health`: Check live status and latency across configured providers.

## Verification
```bash
bun test .kilo/plugin/hodos-strategy/index.test.ts
```
