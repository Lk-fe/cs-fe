class BitAccessor {
  constructor(byteArray) {
    this.byteArray = byteArray;
  }

  validate(elementIndex, bitIndex) {
    if (elementIndex > this.byteArray.length - 1) {
      throw new Error('Index of an element is out of boundaries');
    }

    if (bitIndex < 0 && bitIndex > 7) {
      throw new Error('Index of a bit should be in range from 0 to 7');
    }
  }

  get(elementIndex, bitIndex) {
    this.validate(elementIndex, bitIndex);

    return (this.byteArray[elementIndex] & (1 << bitIndex)) !== 0
     ? 1
     : 0;
  }

  set(elementIndex, bitIndex, newValue) {
    this.validate(elementIndex, bitIndex);

    if (newValue !== 1 && newValue !== 0) {
      throw new Error('Value of the bit shoul be 0 or 1');
    }

    this.byteArray[elementIndex] = newValue === 1
      ? (this.byteArray[elementIndex] | (1 << bitIndex))
      : (this.byteArray[elementIndex] & ~(1 << bitIndex));
  }
}

const createBitAccessor = (byteArray) => new BitAccessor(byteArray);
 
const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));
