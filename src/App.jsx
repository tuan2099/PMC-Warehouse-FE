import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <RouterProvider router={router} />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default App;
