module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStaffExhibition(res, mysql, context, complete){
        mysql.pool.query("SELECT staff_id, exhibition_id FROM snhm_staff_exhibition", function (error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staff_exhibition = results;
            complete();
        });
    }

    function getStaff(res, mysql, context, complete){
        mysql.pool.query("SELECT id FROM snhm_staff", function (error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staff = results;
            complete();
        });
    }

    function getExhibition(res, mysql, context, complete) {
        mysql.pool.query("SELECT id FROM snhm_exhibition", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.exhibition = results;
            complete();
        });
    }

    /*Display all events in database. Requires web based javascript to delete users with AJAX*/
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteEntry.js"];
        var mysql = req.app.get('mysql');
        getStaffExhibition(res, mysql, context, complete);
        getExhibition(res, mysql, context, complete);
        getStaff(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('staff_exhibition', context);
            }
        }
    });

    /* Adds an event, redirects to the event page after adding */
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO snhm_staff_exhibition (staff_id, exhibition_id) VALUES (?,?)";
        var inserts = [req.body.staff_id, req.body.exhibition_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/staff_exhibition');
            }
        });
    });

/* Route to delete an event, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM snhm_staff_exhibition WHERE staff_id = ?";
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
    function getOneStaffExhibition(res, mysql, context, id, complete) {
        var sql = "SELECT staff_id, exhibition_id FROM snhm_staff_exhibition WHERE staff_id = ?";
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
        getOneStaffExhibition(res, mysql, context, req.params.id, complete);
        getExhibition(res, mysql, context, complete);
        getStaff(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                console.log(context.event.staff_id);
                res.render('update-staff-exhibition', context);
            }
        }
    });

        /* The URL that update data is sent to in order to update a person */
    router.put('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE snhm_staff_exhibition SET staff_id=?, exhibition_id=? WHERE staff_id=?";
        var inserts = [req.body.staff, req.body.exhibition, req.params.id];
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