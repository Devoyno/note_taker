const router = require("express").Router();
const Notes = require("../db/Notes");



router.get("/notes", function(req, res){
  Notes.parseNotes().then(notes => res.json(notes)).catch(err =>res.status(500).json(err))

});


router.post("/notes", function(req, res){
  Notes.createNote(req.body).then(notes => res.json(notes)).catch(err =>res.status(500).json(err))
  
});

router.delete("/notes/:id", function(req, res) {
  Notes.deleteNote(req.params.id).then(() => res.json({ok: true})).catch(err => res.status(500).json(err))
})

module.exports = router;