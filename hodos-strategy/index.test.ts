import { describe, expect, it } from "bun:test";
import flockStrategyPlugin, { metadata } from "./index";

describe("estate/hodos-strategy plugin", () => {
  it("exports valid metadata conforming to Agent Plugins v1.0.0", () => {
    expect(metadata.name).toBe("estate/hodos-strategy");
    expect(metadata.conformsTo).toBe("Agent Plugins v1.0.0");
    expect(metadata.targets).toContain("server");
  });

  it("registers strategy query tools", () => {
    const plugin = flockStrategyPlugin();
    expect(plugin.name).toBe("estate/hodos-strategy");
    expect(plugin.tools).toBeDefined();
    expect(plugin.tools.hodos_status).toBeDefined();
    expect(plugin.tools.hodos_strategies).toBeDefined();
    expect(plugin.tools.hodos_metrics).toBeDefined();
  });
});
