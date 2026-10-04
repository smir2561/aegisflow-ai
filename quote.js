const URL = "https://agent.bitget.com/mcp";

async function req(method, params, sessionId) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream"
  };

  if (sessionId) headers["Mcp-Session-Id"] = sessionId;

  const r = await fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params
    })
  });

  return {
    sessionId: r.headers.get("mcp-session-id"),
    text: await r.text()
  };
}

async function main() {
  const init = await req("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: {
      name: "AegisFlow AI",
      version: "1.0.0"
    }
  });

  const sid = init.sessionId;

  const result = await req("tools/call", {
    name: "do_query",
    arguments: {
      entry_id: "equity_price_quote",
      params: {
        symbol: "AAPL"
      }
    }
  }, sid);

  console.log(result.text);
}

main().catch(console.error);
