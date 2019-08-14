module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // inner join to show exhibition room and staff first name instead of their id's
    function getEvent(res, mysql, context, complete) {
        mysql.pool.query("SELECT se.id AS id, sx.room AS exhibition_id, ss.first_name AS staff_id, se.type AS type, DATE_FORMAT(se.date, '%Y-%m-%d') AS date FROM snhm_event se INNER JOIN snhm_exhibition AS sx ON se.exhibition_id = sx.id INNER JOIN snhm_staff AS ss ON se.staff_id = ss.id", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.event = results;
            complete();
        });
    }

    function getExhibition(res, mysql, context, complete) {
        mysql.pool.query("SELECT id, room FROM snhm_exhibition", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.exhibition = results;
            complete();
        });
    }

    function getStaff(res, mysql, context, complete) {
        mysql.pool.query("SELECT id, first_name, last_name FROM snhm_staff", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staff = results;
            complete();
        });
    }

    /*Display all events in database. Requires web based javascript to delete users with AJAX*/
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteEntry.js"];
        var mysql = req.app.get('mysql');
        getEvent(res, mysql, context, complete);
        getExhibition(res, mysql, context, complete);
        getStaff(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('event', context);
            }
        }
    });

    /* Adds an event, redirects to the event page after adding */
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO snhm_event (exhibition_id, staff_id, type, date) VALUES (?,?,?,?)";
        var inserts = [req.body.exhibition_id, req.body.staff_id, req.body.type, req.body.date];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/event');
            }
        });
    });

    /* Route to delete an event, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM snhm_event WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                console.log('Event successfully deleted');
                res.status(202).end();
            }
        })
    });

    /* Get one event */
    function getOneEvent(res, mysql, context, id, complete) {
        var sql = "SELECT id, exhibition_id, staff_id, type, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM snhm_event WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.event = results[0];
            complete();
        });
    }

    /* Display one artifact for the specific purpose of updating artifacts */
    router.get('/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedEntry.js", "updateEntry.js"];
        var mysql = req.app.get('mysql');
        getOneEvent(res, mysql, context, req.params.id, complete);
        getExhibition(res, mysql, context, complete);
        getStaff(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('update-event', context);
            }
        }
    });

    /* The URL that update data is sent to in order to update a person */
    router.put('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE snhm_event SET exhibition_id=?, staff_id=?, type=?, date=? WHERE id=?";
        var inserts = [req.body.exhibition_id, req.body.staff_id, req.body.type, req.body.date, req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();