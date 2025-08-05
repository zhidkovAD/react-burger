import { createRoot } from 'react-dom/client';
import { App } from '@/components/app/app';
import './index.css';

import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';
import { store } from './services/store';

createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}>
				{/* Для деплоя параметр basename='/react-burger/' */}
				<BrowserRouter > 
					<App />
				</BrowserRouter>
			</DndProvider>
		</Provider>
	// </React.StrictMode>
);
