export default class ProcessStack {
  private stack: string[] = [];

  push(step: string): void {
    this.stack.push(step);
  }

  pop(): string | undefined {
    return this.stack.pop();
  }

  peek(): string | undefined {
    return this.stack[this.stack.length - 1];
  }

  redo(): void {
    // Implementation for redo can be added here

    const length = this.stack.length;

    if (length > 0) {
      const lastStep = this.stack[length - 1];

      // take the last step and push it again to the stack
      this.stack.push(lastStep);
    }
  }

  undo(): string | undefined {
    return this.pop();
  }
}