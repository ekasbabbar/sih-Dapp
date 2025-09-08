export function requestLogger(req, _res, next) {
  const startedAt = Date.now();
  const { method, originalUrl } = req;
  req.on("end", () => {
    const duration = Date.now() - startedAt;
    console.log(`${method} ${originalUrl} - ${duration}ms`);
  });
  next();
}


