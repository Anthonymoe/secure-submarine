const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//needed for auth
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');
const { badSecret } = require('../constants/warnings');

router.get('/', rejectUnauthenticated, (req, res) => {
  
  pool
    .query(`SELECT * FROM "secret"
    JOIN "user" ON "user".clearance_level >= secret.secrecy_level
    ORDER BY "user".username ASC;`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
