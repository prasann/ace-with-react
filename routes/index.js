import path from 'path';
import jwt from 'jsonwebtoken';
import {validateToken} from "../middleware";

export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/init', addon.authenticate(), (req, res) => {
        const token = jwt.sign({ accessToken: 'customAccessToken' }, 'secret-key')
        res.cookie("secureToken", token)
        res.sendFile(path.join(__dirname, '/../client/build/', 'index.html'));
    });

    app.get('/test-route',validateToken, (req, res) => {
        res.json({ message: "You are a authenticated user !!!" });
    });
}
