import path from 'path';

export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/init', addon.authenticate(), (req, res) => {
        res.sendFile(path.join(__dirname, '/../client/build/', 'index.html'));
    });

    // Add additional route handlers here...
}
