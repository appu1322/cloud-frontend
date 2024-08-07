import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { SnackbarProvider } from "notistack";
import { LoadingProvider } from './hooks/useLoader.tsx';
import { store } from './redux/store';
import { Provider as ReduxProvider } from 'react-redux'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <LoadingProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            preventDuplicate
            maxSnack={3}
            iconVariant={{
              success: <ErrorOutlineIcon />,
              error: <ErrorOutlineIcon />,
              warning: <WarningAmberIcon />,
              info: <TaskAltIcon />,
              default: <WifiOffIcon />
            }}
          >
            <App />
          </SnackbarProvider>
        </QueryClientProvider>
      </LoadingProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
