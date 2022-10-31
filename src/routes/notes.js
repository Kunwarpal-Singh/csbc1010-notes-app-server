const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')

/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get('/', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)

  /* 
    TODO-3:
      Fetch all notes from the database
      Return an array of note objects

      Your return object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */

    var notes = [] // this is the response object, make sure to replace with actual value
    let response = "SELECT * FROM note_details2 ORDER BY id DESC"; // query database to get all the players
    db.query(response, function (err, result) {
      if (err) throw err; 
      notes = result;  
      if (!validateNoteArray(notes)) {
       return res.status(500).send('Invalid data type')
      }
      return res.send({ notes })   
    });
})

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', async (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
  const searchKey = req.params.searchKey
  console.log(searchKey)

    var notes = [] // this is the response object, make sure to replace with actual value

    const searchNotes = `SELECT * from note_details2 WHERE text like '%${searchKey}%'`;
    db.query(searchNotes, function (err, result) {
      if (err) throw err; 
      notes = result;  
      if (!validateNoteArray(notes)) {
       return res.status(500).send('Invalid data type')
      }
      return res.send({ notes })   
    });

})


/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

  /*
    TODO-8:
      Delete all notes from the database
  */
    let responseDeleteAllNotes = "DELETE FROM note_details2;"
    db.query(responseDeleteAllNotes, function (err, result) {
      if (err) throw err; 
     
      return res.send()   
    });

})
module.exports = router