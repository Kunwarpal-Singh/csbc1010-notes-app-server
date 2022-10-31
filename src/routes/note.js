const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')

/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post('/', (req, res) => {
  console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`)

  /*
  	TODO-4:
  		Given node content
  		Create a new node and store the node to the database,
  		Return the newly created note object

  		Note content is stored in variable newText

  		Your return object should be something similar to this:
      	{ id, text, dateCreated, lastModified }
  */

    const newData = req.body.text;

    let response = "INSERT INTO note_details2 (text) VALUES ('" + newData + "')";
    db.query(response, function (err, result) {
      if (err) throw err;   
    });

    var newNote = {} // this is the response object, make sure to replace with actual value

    let responseNewNote = "SELECT * FROM note_details2 ORDER BY id desc LIMIT 1";
    db.query(responseNewNote, function (err, result) {
      if (err) throw err;   
      newNote = result[0];
      if (!validateNote(newNote)) {
        return res.status(500).send('Invalid data type')
      }
      return res.status(201).send({ newNote })

    });

  
  console.log(newNote);

})

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put('/', (req, res) => {
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)

  /*
		TODO-5:
			Given note id and content
			Update the note's content with the given id in the database
			Return the updated note object

			Note id is stored in variable noteId
			Note content is stored in variable newText

			Your return object should be something similar to this:
        { id, text, dateCreated, lastModified }
	*/
	const noteId = req.body.id
	const newText = req.body.text


		var updatedNote = {} // this is the response object, make sure to replace with actual value

    let updateNote = `update note_details2 SET text = "${newText}" WHERE id=${noteId}`;
    db.query(updateNote, function (err, result) {
      if (err) throw err;   
      
    });

    let responseUpdateNote = `Select * from note_details2 WHERE id=${noteId}`;
    db.query(responseUpdateNote, function (err, result) {
      if (err) throw err;   
      updatedNote = result[0];
      if (!validateNote(newText)) {
        return res.status(500).send('Fail to update')
      }
      return res.status(201).send({ newText })

    });
})

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)

  /*
	  TODO-6:
      Given a note id
		  Delete note with the given id from the database

		  Note id is stored in variable noteId 
	*/
	const noteId = req.body.id

    let responseDeleteNote = `delete from note_details2 WHERE id=${noteId}`;
    db.query(responseDeleteNote, function (err, result) {
      if (err) throw err;   
      return res.send();
    });
})

module.exports = router
