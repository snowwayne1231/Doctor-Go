// const productMainServer = '13.230.238.200';
// const productMainServer = 'pub.beautyapp.wdo.tw';
const productMainServer = '60.249.45.246';
const devMainServer = '127.0.0.1:80';
// const devMainServer = '192.168.1.106';

module.exports = (process.env.NODE_ENV === 'development') ? {
    mainServer: devMainServer,
    mainServerURL: `http://${devMainServer}/`,
} : {
    mainServer: productMainServer,
    mainServerURL: `http://${productMainServer}/`,
};