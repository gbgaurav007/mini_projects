import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Github from './Github';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Github />
    </React.StrictMode>
);