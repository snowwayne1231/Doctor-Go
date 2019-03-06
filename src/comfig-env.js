const productMainServer = 'www.doctor-go.com';
const devMainServer = '127.0.0.1:8000';

module.exports = process.env.NODE_ENV === 'production' ? {
    mainServer: productMainServer,
    mainServerURL: `http://${productMainServer}/`,
} : {
    mainServer: devMainServer,
    mainServerURL: `http://${devMainServer}/`,
};