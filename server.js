const port = Number(process.env.PORT) || 3000;

const server = Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = Bun.file(`.${path}`);
    return file.exists().then((ok) =>
      ok ? new Response(file) : new Response("Not found", { status: 404 })
    );
  },
});

console.log(`Serving on http://localhost:${server.port}`);
