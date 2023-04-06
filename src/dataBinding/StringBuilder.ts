/**
 * A simple StringBuilder class for building strings incrementally.
 */

export class StringBuilder {
    private buffer: string[];

    constructor(initialValue = '') {
        this.buffer = [initialValue];
    }

    append(value: string): void {
        this.buffer.push(value);
    }

    toString(): string {
        return this.buffer.join('');
    }
}
