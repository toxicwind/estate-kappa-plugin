# Thresher Plugin (`estate/thresher`)

Exposes Thresher's MCP discovery and proxy tooling to the `kappa` agent runtime.

## Service Connection
- **Default Endpoint**: `http://127.0.0.1:25127` (Pitchfork daemon: `thresher`)
- **Override**: `THRESHER_URL`

## Exported Tools
- `thresher_retrieve_tools`: Query available MCP tools registered with Thresher.
- `thresher_call_tool`: Execute an MCP tool through Thresher's proxy layer.

## Verification
```bash
bun test .kilo/plugin/thresher/index.test.ts
```
