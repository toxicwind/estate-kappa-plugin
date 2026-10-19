#!/usr/bin/env bun
// .kilo/plugin/estate-gatehouse.ts
// Server plugin: expose gatehouse MCP tools as Kilo tools.
// Conforms to Agent Plugins v1.0.0: exports "./server" with a default function.
// Namespace-qualified to avoid the 81% name-collision problem (arXiv 2609.23809).

const GATEHOUSE_URL = process.env.GATEHOUSE_URL || "http://127.0.0.1:25127";

export default function gatehousePlugin() {
  return {
    name: "estate/gatehouse",
    description: "gatehouse MCP gateway — discover, call, audit MCP tools across the estate mesh",
    tools: {
      gatehouse_discover: {
        description: "List all MCP servers connected to gatehouse with their tool counts",
        parameters: { type: "object", properties: {} },
        handler: async () => {
          const r = await fetch(`${GATEHOUSE_URL}/api/v1/servers`, { headers: { Accept: "application/json" } });
          return r.json();
        },
      },
      gatehouse_retrieve_tools: {
        description: "BM25 search across all connected MCP servers for tools matching a query",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "Natural language query for tool discovery" },
            limit: { type: "number", default: 10 },
          },
          required: ["query"],
        },
        handler: async ({ query, limit = 10 }: { query: string; limit?: number }) => {
          const r = await fetch(`${GATEHOUSE_URL}/api/v1/tools/retrieve`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ query, limit }),
          });
          return r.json();
        },
      },
      gatehouse_call_tool: {
        description: "Call a tool on a specific MCP server through gatehouse",
        parameters: {
          type: "object",
          properties: {
            server: { type: "string", description: "Server name (e.g. github, filesystem)" },
            tool: { type: "string", description: "Tool name" },
            args: { type: "object", description: "Tool arguments" },
          },
          required: ["server", "tool"],
        },
        handler: async ({ server, tool, args = {} }: { server: string; tool: string; args?: Record<string, unknown> }) => {
          const r = await fetch(`${GATEHOUSE_URL}/api/v1/servers/${encodeURIComponent(server)}/tools/${encodeURIComponent(tool)}/call`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ args }),
          });
          return r.json();
        },
      },
      gatehouse_activity: {
        description: "Query the gatehouse activity log — every tool call is recorded",
        parameters: {
          type: "object",
          properties: {
            requestId: { type: "string", description: "Optional request ID to filter" },
            limit: { type: "number", default: 20 },
          },
        },
        handler: async ({ requestId, limit = 20 }: { requestId?: string; limit?: number }) => {
          const q = new URLSearchParams({ limit: String(limit) });
          if (requestId) q.set("requestId", requestId);
          const r = await fetch(`${GATEHOUSE_URL}/api/v1/activity?${q}`, { headers: { Accept: "application/json" } });
          return r.json();
        },
      },
      gatehouse_preflight: {
        description: "Verify required tools are ready before an automation runs — no upstream contact",
        parameters: {
          type: "object",
          properties: {
            tools: { type: "array", items: { type: "string" }, description: "Tool IDs in server:tool format" },
            wait: { type: "string", default: "10s" },
          },
          required: ["tools"],
        },
        handler: async ({ tools, wait = "10s" }: { tools: string[]; wait?: string }) => {
          const r = await fetch(`${GATEHOUSE_URL}/api/v1/tools/preflight`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ tools, wait }),
          });
          return r.json();
        },
      },
    },
  };
}

export const metadata = {
  name: "estate/gatehouse",
  version: "1.0.0",
  category: "providers",
  targets: ["server"],
  conformsTo: "Agent Plugins v1.0.0",
};