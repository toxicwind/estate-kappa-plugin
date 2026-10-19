import { describe, expect, it } from "bun:test";
import herdModelsPlugin, { metadata } from "./index";

describe("estate/herd-models plugin", () => {
  it("exports valid metadata conforming to Agent Plugins v1.0.0", () => {
    expect(metadata.name).toBe("estate/herd-models");
    expect(metadata.conformsTo).toBe("Agent Plugins v1.0.0");
    expect(metadata.targets).toContain("server");
  });

  it("registers models hook", () => {
    const plugin = herdModelsPlugin();
    expect(plugin.name).toBe("estate/herd-models");
    expect(plugin.models).toBeDefined();
  });
});
