import { describe, expect, it } from "bun:test";
import thresherPlugin, { metadata } from "./index";

describe("estate/thresher plugin", () => {
  it("exports valid metadata conforming to Agent Plugins v1.0.0", () => {
    expect(metadata.name).toBe("estate/thresher");
    expect(metadata.conformsTo).toBe("Agent Plugins v1.0.0");
    expect(metadata.targets).toContain("server");
  });

  it("registers retrieve and call tools", () => {
    const plugin = thresherPlugin();
    expect(plugin.name).toBe("estate/thresher");
    expect(plugin.tools).toBeDefined();
    expect(plugin.tools.thresher_retrieve_tools).toBeDefined();
    expect(plugin.tools.thresher_call_tool).toBeDefined();
  });
});
