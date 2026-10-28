
export const loggerMiddleware = (req, res, next) => {
    const startTime = Date.now();

    console.log(
        `Incoming Request: ${req.method} ${req.originalUrl}`
    );

    res.on('finish', () => {
        const duration = Date.now() - startTime;

        console.log(
            `Response: ${res.statusCode} | Duration: ${duration}ms`
        );
    });

    next();
};
