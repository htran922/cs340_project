module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getArtifact(res, mysql, context, complete) {
        mysql.pool.query("SELECT id, display, acquisition_year, material, damage FROM snhm_artifact", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.artifact = results;
            complete();
        });
    }

    /* Display all artifacts. Requires web based javascript to delete users with AJAX*/
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteEntry.js"];
        var mysql = req.app.get('mysql');
        getArtifact(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('artifact', context);
            }
        }
    });

    /* Adds an artifact, redirects to the artifact page after adding */
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO snhm_artifact (display, acquisition_year, material, damage) VALUES (?,?,?,?)";
        var inserts = [req.body.display, req.body.acquisition_year, req.body.material, req.body.damage];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/artifact');
            }
        });
    });

    /* Route to delete an artifact, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM snhm_artifact WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                console.log('Artifact successfully deleted');
                res.status(202).end();
            }
        })
    });

    /* Get one artifact */
    function getOneArtifact (res, mysql, context, id, complete){
        var sql = "SELECT id, display, acquisition_year, material, damage FROM snhm_artifact WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.artifact = results[0];
            complete();
        });
    }

    /* Display one artifact for the specific purpose of updating artifacts */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateEntry.js"];
        var mysql = req.app.get('mysql');
        getOneArtifact(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-artifact', context);
            }
        }
    });

    /* The URL that update data is sent to in order to update a person */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE snhm_artifact SET display=?, acquisition_year=?, material=?, damage=? WHERE id=?";
        var inserts = [req.body.display, req.body.acquisition_year, req.body.material, req.body.damage, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();