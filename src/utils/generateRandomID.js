export default function() {
    return new Date().getDate() + '' + new Date().getMonth() + '' + new Date().getFullYear() + '' + new Date().getTime() + '' + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
}