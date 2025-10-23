const buffer = new ArrayBuffer(8);
const dv = new DataView(buffer);

dv.setInt16(0, 300); // ghi 300 tại byte 0-1
dv.setFloat32(2, 3.14); // ghi float tại byte 2-5

console.log(new Uint8Array(buffer)); // Uint8Array(8) [1,  44, 64, 72, 245, 195,  0,  0]
console.log(dv.getInt16(0)); // 300
console.log(dv.getFloat32(3)); // 3.14
