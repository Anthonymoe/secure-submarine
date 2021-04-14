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
  // protected route (must be authenticated)
  //athourization 
  // if( user.clearance_level >= secret.secrecy_level )//not quite right may be in the query and have to execute
  // console.log('req.user:', req.user);
  // if( user.username === 'Captain Borodin' )

  //WHERE "user".username = req.user.username

  //Something not quite right with syntax here need to figure it out.
  pool
    .query(`SELECT * FROM "secret"
    JOIN "user" ON "user".clearance_level > secret.secrecy_level
    WHERE "user".username = {req.user.username}
    ORDER BY "user".username ASC;`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
