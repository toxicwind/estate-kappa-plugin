#!/usr/bin/env bun
// .kilo/plugin/estate-hodos-strategy.ts
// Server plugin: expose hodos's strategy routing as Kilo tools.
// Namespace-qualified, conforming, and atomized.

const HODOS_URL = process.env.HODOS_URL || "http://127.0.0.1:25193";

export default function flockStrategyPlugin() {
  return {
    name: "estate/hodos-strategy",
    description: "hodos provider router — query strategy weights, health, and routing decisions",
    tools: {
      hodos_status: {
        description: "Get hodos status: all providers, health, weights, and last error",
        parameters: { type: "object", properties: {} },
        handler: async () => {
          const r = await fetch(`${HODOS_URL}/api/v1/status`, { headers: { Accept: "application/json" } });
          return r.json();
        },
      },
      hodos_strategies: {
        description: "List all available routing strategies with their descriptions",
        parameters: { type: "object", properties: {} },
        handler: async () => {
          const r = await fetch(`${HODOS_URL}/api/v1/strategies`, { headers: { Accept: "application/json" } });
          return r.json();
        },
      },
      hodos_route: {
        description: "Get the routing decision for a model and parameters — which provider would be chosen",
        parameters: {
          type: "object",
          properties: {
            model: { type: "string", description: "Model name (e.g. qwen2.5:7b)" },
            parameters: { type: "object", description: "Inference parameters (temperature, top_p, etc)" },
          },
          required: ["model"],
        },
        handler: async ({ model, parameters = {} }: { model: string; parameters?: Record<string, unknown> }) => {
          const r = await fetch(`${HODOS_URL}/api/v1/route`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ model, parameters }),
          });
          return r.json();
        },
      },
      hodos_metrics: {
        description: "Get detailed metrics for all providers: latency, throughput, error rates",
        parameters: {
          type: "object",
          properties: {
            window: { type: "string", default: "5m", description: "Time window for metrics (e.g. 5m, 1h)" },
          },
        },
        handler: async ({ window = "5m" }: { window?: string }) => {
          const r = await fetch(`${HODOS_URL}/api/v1/metrics?window=${window}`, { headers: { Accept: "application/json" } });
          return r.json();
        },
      },
    },
  };
}

export const metadata = {
  name: "estate/hodos-strategy",
  version: "1.0.0",
  category: "providers",
  targets: ["server"],
  conformsTo: "Agent Plugins v1.0.0",
};