const myTimeOut = (ms, context) =>
    setTimeout(() => {
        context.end();
    }, ms);

module.exports = myTimeOut;
