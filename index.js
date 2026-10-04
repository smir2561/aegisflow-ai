const MCP_URL = "https://agent.bitget.com/mcp";

async function mcpRequest(method, params, sessionId = null) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream"
  };

  if (sessionId) {
    headers["Mcp-Session-Id"] = sessionId;
  }

  const response = await fetch(MCP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params
    })
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Bitget MCP error ${response.status}: ${text}`);
  }

  return {
    sessionId: response.headers.get("mcp-session-id"),
    text
  };
}

async function main() {
  console.log("Connecting to Bitget MCP...");

  const init = await mcpRequest("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: {
      name: "AegisFlow AI",
      version: "1.0.0"
    }
  });

  console.log("Initialize response:");
  console.log(init.text);

  const sessionId = init.sessionId;

  if (!sessionId) {
    throw new Error("No MCP session ID received.");
  }

  console.log("MCP session established.");

  const tools = await mcpRequest("tools/list", {}, sessionId);

  console.log("Available Bitget MCP tools:");
  console.log(tools.text);
}

main().catch((error) => {
  console.error("ERROR:", error.message);
});
