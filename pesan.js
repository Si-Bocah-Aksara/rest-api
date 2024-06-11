function sukses(kata){
    return `\u001b[42m\u001b[32m${kata}\u001b[0m\n`
}
function gagal(kata){
    return `\u001b[41m\u001b[30m${kata}\u001b[0m\n`
}
function info(kata){
    return `\u001b[34m${kata}\u001b[0m\n`
}
function peringatan(kata){
    return `\u001b[43m${kata}\u001b[0m\n`
}

module.exports = {sukses, gagal, info, peringatan};