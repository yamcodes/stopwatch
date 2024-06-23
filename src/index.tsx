/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { App } from './app';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we create the root element in the index.html
render(() => <App />, root!);
