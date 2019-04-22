const productMainServer = '13.230.238.200';
const devMainServer = '127.0.0.1:80';
// const devMainServer = '13.230.238.200';

module.exports = (process.env.NODE_ENV === 'development') ? {
    mainServer: devMainServer,
    mainServerURL: `http://${devMainServer}/`,
} : {
    mainServer: productMainServer,
    mainServerURL: `http://${productMainServer}/`,
};