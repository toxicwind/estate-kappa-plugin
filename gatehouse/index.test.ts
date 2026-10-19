import { describe, expect, it } from "bun:test";
import gatehousePlugin, { metadata } from "./index";

describe("estate/gatehouse plugin", () => {
  it("exports valid metadata conforming to Agent Plugins v1.0.0", () => {
    expect(metadata.name).toBe("estate/gatehouse");
    expect(metadata.conformsTo).toBe("Agent Plugins v1.0.0");
    expect(metadata.targets).toContain("server");
  });

  it("registers retrieve and call tools", () => {
    const plugin = gatehousePlugin();
    expect(plugin.name).toBe("estate/gatehouse");
    expect(plugin.tools).toBeDefined();
    expect(plugin.tools.gatehouse_retrieve_tools).toBeDefined();
    expect(plugin.tools.gatehouse_call_tool).toBeDefined();
  });
});
