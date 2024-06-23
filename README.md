# stopwatch

A simple stopwatch app built with SolidJS.

## Features

- Start, pause, and reset the stopwatch
- Keyboard shortcuts (space to start/pause, r to reset)
- Lightweight and fast
- Responsive design adapting to screen resizing

## Development

### Prerequisites

- Node.js (v18 or later)
- pnpm (v9 or later)

### Installation

1. Clone the repository:

```
git clone https://github.com/yamcodes/stopwatch
```

2. Change to the project directory:

```
cd stopwatch
```

3. Install dependencies:

```
pnpm install
```

### Running the App

To start the development server, run:

```
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

To build the app for production, run:

```
pnpm build
```

The optimized and minified files will be generated in the `dist` folder.

## Usage

- Press the spacebar or click the "Start" button to start the stopwatch
- Press the spacebar or click the "Pause" button to pause the stopwatch
- Press "R" or click the "Reset" button to reset the stopwatch

## Keyboard Shortcuts

```ts
const KEYS = {
  START_OR_PAUSE: ' ',
  RESET: 'r',
} as const;
```

## Deployment

You can deploy the `dist` folder to any static host provider (Netlify, Surge, Now, etc.)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
