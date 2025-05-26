import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './services/store';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}>
				<App />
			</DndProvider>
		</Provider>
	</React.StrictMode>
);
