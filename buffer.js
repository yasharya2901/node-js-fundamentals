// const buf = Buffer.from('Hello, World!', 'utf-8');
const buf = Buffer.alloc(1e9);
for (let i = 0; i < buf.length; i++) {
    buf[i] = i % 256;
}
console.log(buf)