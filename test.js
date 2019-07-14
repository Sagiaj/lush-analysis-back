
const asyncOp = async () => {
    return new Promise((resolve) => {
        setTimeout(resolve);
    });
};

const promised = () => {
    return asyncOp().then(res => {
        console.log('promised.asyncOp:', res);
        return res;
    });
};

const asynced = async () => {
    let res = await asyncOp();
    console.log('asynced.asyncOp.res:', res);
    return res;
};

(async () => {
    await asynced();
    promised();
})();
