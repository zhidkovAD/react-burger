import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { refreshToken } from '../auth';
import { getCookie } from '@utils/cookie';


import type { AppDispatch, RootState } from '@utils/types';
import { getUser } from '../auth';

export function getEventMessage(e: Event) {
  if (e instanceof ErrorEvent) {
      return e.message;
  } else if (e instanceof CloseEvent) {
      return `${e.code} ${e.reason}`;
  }

  return `Ошибка ${e.type}: ${JSON.stringify(e, Object.getOwnPropertyNames(e))}`;
}


export const socketMiddleware = (wsActions:any): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let timerWsReconnect = 0;
    let isWsConnected = false;
    let url = '';

    return next => (action: AnyAction) => {
      const { dispatch } = store;

      if (wsActions.onConnect.match(action)) {
        url = action.payload.url;
        if (action.payload.addToken) {
          url += `?token=${getCookie('accessToken')}`;
        }
        
        let cnt = 0;
        //при нестабильном соединении
        while (cnt < 3) {
          try {
            socket = new WebSocket(url);
            break;
          } catch {
            cnt++;
          }
        }
        
        isWsConnected = true;
        window.clearTimeout(timerWsReconnect);
        dispatch(wsActions.onSuccess());
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(wsActions.onOpen());
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            dispatch(wsActions.onError(getEventMessage(event)));
            socket?.close();
          }
          if (isWsConnected) {
            dispatch(wsActions.onClosed());
            timerWsReconnect = window.setTimeout(() => {
              dispatch(wsActions.onConnect({url: url}));
            }, 3000)
          }
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (!parsedData?.success) {
            if (parsedData?.message === 'Invalid or missing token') {
              refreshToken().catch((err: any) => {
                console.error(err)
                dispatch(getUser());
              });
            }
            dispatch(wsActions.onError(parsedData?.message));
          } else {
            const { success, ...restParsedData } = parsedData;
            dispatch(wsActions.onMessage(restParsedData));
          }
        };

        socket.onerror = event => {
          dispatch(wsActions.onError(getEventMessage(event)));
        };

        if (wsActions.onDisconnect.match(action) ) {
          window.clearTimeout(timerWsReconnect);
          isWsConnected = false;
          timerWsReconnect = 0;
          socket.close();
          dispatch(wsActions.onClosed());
        }
      }
      next(action);
    };
  };
};
