export default function random(a, b) {
    return a+(b-a+1)*crypto.getRandomValues(new Uint32Array(1))[0]/2**32|0
}