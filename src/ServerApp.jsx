import { renderToPipableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server'; //react router that can be run in node
import App from './App';

export default function render(url, opts) {
    const stream = renderToPipableStream(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>,
        opts
    );

    return stream;
}
