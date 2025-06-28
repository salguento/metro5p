class App {
  private root: HTMLElement;

  constructor() {
    this.root = document.getElementById('app')!;
    this.render();
  }

  private render(): void {
    this.root.innerHTML = `
      <h1>Pure TypeScript App</h1>
      <button id="demo-btn">Click Me</button>
    `;
    
    document.getElementById('demo-btn')!
      .addEventListener('click', this.handleClick);
  }

  private handleClick = (): void => {
    alert('TypeScript works!');
  }
}

// Start app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => new App());