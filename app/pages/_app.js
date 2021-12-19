import { Provider } from 'react-redux';
import Head from 'next/head';
import App from 'next/app';
import withReduxStore from '../src/store/lib/with-redux-store';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps, store }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default withReduxStore(MyApp);
