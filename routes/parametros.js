var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('parametros');
});

router.post('/', function (req, res) {
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query("SELECT * FROM parametros WHERE id_empresa = ?", [req.body.idempresa],
        function (err, rows) {
          if (rows.length != 0) {
            connection.query("UPDATE parametros SET vagas_cobertas = ?, vagas_descobertas = ? WHERE id_empresa = ?",
              [
                req.body.vagas_cobertas,
                req.body.vagas_descobertas,
                req.body.idempresa

              ], function (err, result) {
                if (err) {
                  console.log("Erro update: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  res.redirect('/parametros');
                }
              }
            );
          } else {
            connection.query("INSERT INTO parametros(vagas_cobertas, vagas_descobertas, id_empresa) VALUES (?,?,?)",
              [
                req.body.vagas_cobertas,
                req.body.vagas_descobertas,
                req.body.idempresa

              ], function (err, result) {
                if (err) {
                  console.log("Erro insert: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  res.redirect('/parametros');
                }
              }
            );
          }
          if (err) {
            console.log("Error Selecting : %s ", err);
            res.sendStatus(404);
          }
        }
      );
    }
  });
});

module.exports = router;
