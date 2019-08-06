module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getExhibition(res, mysql, context, complete){
        mysql.pool.query("SELECT id, artifact_id, room, subject, start_date, end_date FROM snhm_exhibition", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.exhibition = results;
            complete();
        });
    }

    function getArtifact(res, mysql, context, complete){
        mysql.pool.query("SELECT id FROM snhm_artifact", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.artifact = results;
            complete();
        });
    }

    /*Display all exhibitions in database. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteEntry.js"];
        var mysql = req.app.get('mysql');
        getExhibition(res, mysql, context, complete);
        getArtifact(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('exhibition', context);
            }
        }
    });

    /* Adds an exhibition, redirects to the exhibition page after adding */
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO snhm_exhibition (artifact_id, room, subject, start_date, end_date) VALUES (?,?,?,?,?)";
        var inserts = [req.body.artifact_id, req.body.room, req.body.subject, req.body.start_date, req.body.end_date];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/exhibition');
            }
        });
    });

    /* Route to delete an exhibition, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM snhm_exhibition WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                console.log('Exhibition successfully deleted');
                res.status(202).end();
            }
        })
    });

    /* Get one exhibition */
    function getOneExhibition (res, mysql, context, id, complete){
        var sql = "SELECT id, artifact_id, room, subject, start_date, end_date FROM snhm_exhibition WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.exhibition = results[0];
            complete();
        });
    }

    /* Display one artifact for the specific purpose of updating artifacts */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedEntry.js", "updateEntry.js"];
        var mysql = req.app.get('mysql');
        getOneExhibition(res, mysql, context, req.params.id, complete);
        getArtifact(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-exhibition', context);
            }
        }
    });

    /* The URL that update data is sent to in order to update a person */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE snhm_exhibition SET artifact_id=?, room=?, subject=?, start_date=?, end_date=? WHERE id=?";
        var inserts = [req.body.artifact_id, req.body.room, req.body.subject, req.body.start_date, req.body.end_date, req.params.id];
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