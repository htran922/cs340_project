module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStaff(res, mysql, context, complete){
        mysql.pool.query("SELECT id, first_name, last_name, job FROM snhm_staff", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staff = results;
            complete();
        });
    }

    function getJobs(res, mysql, context, complete){
        mysql.pool.query("SELECT id, job FROM snhm_staff", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staff  = results;
            complete();
        });
    }

    function getPeoplebyJob(req, res, mysql, context, complete){
      var query = "SELECT id, first_name, last_name, job FROM snhm_staff WHERE snhm_staff.job = ?";
      console.log(req.params)
      var inserts = [req.params.staff]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staff = results;
            complete();
        });
    }

        /* Find people whose fname starts with a given string in the req */
    function getPeopleWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT id, first_name, last_name, job FROM snhm_staff WHERE first_name LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

    /*Display all staff in database. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteEntry.js","filterEntry.js","searchEntry.js"];
        var mysql = req.app.get('mysql');
        getStaff(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('staff', context);
            }
        }
    });


        /*Display all staff whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteEntry.js","filterEntry.js","searchEntry.js"];
        var mysql = req.app.get('mysql');
        getPeopleWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('staff', context);
            }
        }
    });

        /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:homeworld', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteEntry.js","filterEntry.js","searchEntry.js"];
        var mysql = req.app.get('mysql');
        getPeoplebyJob(req,res, mysql, context, complete);
        getJobs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('staff', context);
            }

        }
    });

    /* Adds a staff, redirects to the staff page after adding */
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO snhm_staff (first_name, last_name, job) VALUES (?,?,?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.job];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/staff');
            }
        });
    });

    /* Route to delete a staff, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM snhm_staff WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                console.log('Staff successfully deleted');
                res.status(202).end();
            }
        })
    });

    /* Get one staff */
    function getOneStaff (res, mysql, context, id, complete){
        var sql = "SELECT id, first_name, last_name, job FROM snhm_staff WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staff = results[0];
            complete();
        });
    }

    /* Display one artifact for the specific purpose of updating artifacts */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateEntry.js"];
        var mysql = req.app.get('mysql');
        getOneStaff(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-staff', context);
            }
        }
    });

    /* The URL that update data is sent to in order to update a person */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE snhm_staff SET first_name=?, last_name=?, job=? WHERE id=?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.job, req.params.id];
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