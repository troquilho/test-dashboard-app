import React from 'react';
import { createRoot } from 'react-dom/client';
import RootElement from './routes';
import '../src/assets/scss/styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RootElement />);