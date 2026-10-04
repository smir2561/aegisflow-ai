const MCP_URL = "https://agent.bitget.com/mcp";

async function callBitgetMCP(toolName, args = {}) {
  const response = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: {
        name: toolName,
        arguments: args
      }
    })
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Bitget MCP error ${response.status}: ${text}`);
  }

  return text;
}

console.log("AegisFlow AI");
console.log("Bitget US Stock/ETF MCP:", MCP_URL);