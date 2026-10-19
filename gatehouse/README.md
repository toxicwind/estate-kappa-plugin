# Gatehouse Plugin (`estate/gatehouse`)

Exposes Gatehouse's MCP discovery and proxy tooling to the `kappa` agent runtime.

## Service Connection
- **Default Endpoint**: `http://127.0.0.1:25127` (Pitchfork daemon: `gatehouse`)
- **Override**: `GATEHOUSE_URL`

## Exported Tools
- `gatehouse_retrieve_tools`: Query available MCP tools registered with Gatehouse.
- `gatehouse_call_tool`: Execute an MCP tool through Gatehouse's proxy layer.

## Verification
```bash
bun test .kilo/plugin/gatehouse/index.test.ts
```
