const notesRouter = require("express").Router();
const Notes = require("../models/note");
const User = require("../models/user");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");// get the authorization token

  if (authorization && authorization.startsWith("Bearer ", "")) {
    return authorization.replace("Bearer ", ""); //get the Bearer Token
  }

  return null;
};

//Root
notesRouter.get("/info", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//Get all Notes
notesRouter.get("/", (req, res) => {
  Notes.find({})
    .populate("user", { name: 1, notes: 1 })
    .then((notes) => {
      res.json(notes);
    });
  /**
   * const notes = await Notes.find({})
   * response.json(notes)
   */
});

//Get all Notes by Id
notesRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Notes.findById(id)
    .then((notes) => {
      if (notes) {
        res.json(notes);
      } else {
        res.json({ error: "Note Not Found" });
        res.sendStatus(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});
/*
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})
*/

//Delete a Note by ID
notesRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Notes.deleteOne({ _id: id })
    .then(() => res.sendStatus(204).end())
    .catch((error) => next(error));
});

/*
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})
*/
//Add a Note
notesRouter.post("/", async (req, res, next) => {
  const body = req.body;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET); //get the object from the decoded token
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id); // find by the id of the user we from the decoded token

  if (!body.content) {
    return res.status(400).json({ error: "Missing Content" });
  }

  const note = new Notes({
    content: body.content,
    important: Boolean(body.important) || false,
    user: user.id,
  });

  note
    .save()
    .then((saved) => {
      user.notes = user.notes.concat(saved._id);
      user.save();
      res.status(201).json(saved);
    })
    .catch((error) => next(error));

  /**
   * Alternatively, we could have an async before (req, res, next)
   * then we could just do
   * try{
   *  const savedNote = await note.save()
   *  res.status(201).json(savedNote)
   * } catch (err) {
   *  next(err)
   * }
   */
});

notesRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { content, important } = req.body;

  Notes.findByIdAndUpdate(
    { _id: id },
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((update) => res.json(update))
    .catch((error) => next(error));
});

module.exports = notesRouter;
