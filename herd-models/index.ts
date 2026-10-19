#!/usr/bin/env bun
// .kilo/plugin/estate-herd-models.ts
// Server plugin: expose herd's model catalog as Kilo model providers.
// Namespace-qualified, conforming, and atomized (per PluginRSI).

const HERD_URL = process.env.HERD_URL || "http://127.0.0.1:25100";

export default function herdModelsPlugin() {
  return {
    name: "estate/herd-models",
    description: "herd model catalog — expose local LLM models as Kilo model providers for chat completion",
    models: {
      list: {
        description: "List all models served by herd with their parameters",
        parameters: { type: "object", properties: {} },
        handler: async () => {
          const r = await fetch(`${HERD_URL}/v1/models`, { headers: { Accept: "application/json" } });
          const data = await r.json();
          // Transform OpenAI-style models list to Kilo model provider entries
          const models = {};
          for (const m of data.data) {
            models[m.id] = {
              name: m.id,
              options: {
                baseURL: HERD_URL,
                apiKey: "herd-local", // herd doesn't require auth for local
              },
            };
          }
          return models;
        },
      },
      // Dynamic model provider: when Kilo asks for a model, herd serves it
      // This is handled by Kilo's plugin system via the "models" export above
    },
  };
}

export const metadata = {
  name: "estate/herd-models",
  version: "1.0.0",
  category: "providers",
  targets: ["server"],
  conformsTo: "Agent Plugins v1.0.0",
};