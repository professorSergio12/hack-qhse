/**
 * Proxies QHSE form submissions to Hackthone backend.
 * POST /api/proxy/qhse/... → http://localhost:4000/api/qhse/...
 */
function getHackthoneBackend() {
  const raw =
    process.env.HACKTHONE_BACKEND_URL ||
    process.env.NEXT_PUBLIC_HACKTHONE_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:4000";
  return raw.replace(/\/$/, "").replace(/\/api$/, "");
}

function buildBackendUrl(pathSegment) {
  return `${getHackthoneBackend()}/api/qhse/${pathSegment}`;
}

function buildHeaders(contentType) {
  const headers = {};
  if (contentType) headers["Content-Type"] = contentType;
  const apiKey = process.env.HACKTHONE_API_KEY || process.env.API_KEY;
  if (apiKey) headers["X-API-Key"] = apiKey;
  return headers;
}

export async function GET(request, context) {
  const params = await context.params;
  return proxy(request, params);
}

export async function POST(request, context) {
  const params = await context.params;
  return proxy(request, params);
}

export async function PUT(request, context) {
  const params = await context.params;
  return proxy(request, params);
}

export async function PATCH(request, context) {
  const params = await context.params;
  return proxy(request, params);
}

export async function DELETE(request, context) {
  const params = await context.params;
  return proxy(request, params);
}

async function proxy(request, params) {
  const path = params.path;
  const pathSegment = Array.isArray(path) ? path.join("/") : path;
  const url = buildBackendUrl(pathSegment);

  try {
    const contentType = request.headers.get("content-type") || "application/json";
    const options = {
      method: request.method,
      headers: buildHeaders(contentType),
    };

    if (request.method !== "GET" && request.method !== "HEAD" && request.body) {
      options.body = await request.text();
    }

    const backendRes = await fetch(url, options);
    const text = await backendRes.text();

    return new Response(text, {
      status: backendRes.status,
      statusText: backendRes.statusText,
      headers: {
        "Content-Type": backendRes.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    console.error("[qhse-proxy]", err.message, "url:", url);
    return Response.json(
      {
        error: "Hackthone backend request failed.",
        message: err.message,
        hint: "Run: cd Hackthone/backend && npm run dev",
      },
      { status: 502 }
    );
  }
}
