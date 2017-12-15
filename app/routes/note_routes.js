var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {

    //Testing API
    app.get('/notes', (req, res) => {
        db.collection('notes').find().toArray(function(error, data) {
            if (error) {
                console.log(error);
            } else {
                console.log("data Length ", data.length);
                console.log("Data:", data);
                res.send(data);
            }
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        console.log("note", note);
        console.log("req:", req.body.title);
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log("result", result);
                res.send(result.ops[0]);
            }
        });
    });

    app.post('/notes/user', (req, res) => {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };

        console.log("user : ", user);

        db.collection('user').insert(user, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log("After Inserting Data : result", result);
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });
};

// Registration of User

app.post('/notes/user', (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };

    console.log("user : ", user);

    db.collection('user').insert(user, (err, result) => {
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            console.log("After Inserting Data : result", result);
            res.send(result.ops[0]);
        }
    });
});