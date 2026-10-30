# ⚡ estate-kappa-plugin

Official estate plugin collection for **kappa** (`@kappacode/cli`).

Exposes native estate services and pitchfork daemons directly as agent capabilities and model providers:

- **`thresher`**: Connects to Thresher MCP (`:25127`) for tool retrieval and sandboxed tool calls.
- **`herd-models`**: Connects to Herd (`:25100`) to dynamically register local llama-server models.
- **`hodos-strategy`**: Connects to Hodos (`:25193`) for provider strategy routing weights and health.

## Verification

```bash
bun test */*.test.ts
```

## Structure

```
estate-kappa-plugin/
├── thresher/
│   ├── README.md
│   ├── index.ts
│   └── index.test.ts
├── herd-models/
│   ├── README.md
│   ├── index.ts
│   └── index.test.ts
└── hodos-strategy/
    ├── README.md
    ├── index.ts
    └── index.test.ts
```
