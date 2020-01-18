var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

constants = require("./backend/constants");

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/test",
  function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
      var port = server.address().port;
      console.log("App now running on port", port);
    });
  }
);

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
}

/*  "/api/actions"
 *    GET: finds all actions
 *    POST: creates a new action
 */

app.get("/api/actions", function (req, res) {
  db.collection(constants.ACTIONS_COLLECTION)
    .find({})
    .toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get actions.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post("/api/actions", function (req, res) {
  var bb = {
    name: req.body.name,
    createDate: new Date()
  };
  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(constants.ACTIONS_COLLECTION).insertOne(bb, function (
      err,
      doc
    ) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

//

app.get("/api/action/:id", function (req, res) {
  db.collection(constants.SUBACTIONS_COLLECTION)
    .find({ action_id: ObjectID(req.params.id) })
    .toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get actions.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post("/api/action/:id", function (req, res) {
  var newSubAction = req.body;
  newSubAction.createDate = new Date();

  // ToDo: Check if action ID exists or not

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }
  var bb = {
    name: req.body.name,
    action_id: ObjectID(req.params.id),
    createDate: new Date()
  };

  db.collection(constants.SUBACTIONS_COLLECTION).insertOne(bb, function (
    err,
    doc
  ) {
    if (err) {
      handleError(res, err.message, "Failed to create new Subaction.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get("/api/templates/:subaction", function (req, res) {
  db.collection(constants.TEMPLATES_COLLECTION)
    .find({ subaction_id: ObjectID(req.params.subaction) })
    .toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get actions.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.get("/api/template/:templateid", function (req, res) {
  console.log(req.params.templateid);
  db.collection(constants.TEMPLATES_COLLECTION)
    .find({ _id: ObjectID(req.params.templateid) })
    .toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get templates.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post("/api/templates/:subaction_id", function (req, res) {
  var newSubAction = req.body;
  newSubAction.createDate = new Date();

  if (!req.body.language) {
    handleError(res, "Invalid user input", "Must provide a Language name", 400);
  }
  if (!req.body.template) {
    handleError(res, "Invalid user input", "Must provide a Template", 400);
  }
  if (!req.body.instructions) {
    handleError(res, "Invalid user input", "Must provide Instructions", 400);
  }

  // ToDo: Check if subaction ID exists or not

  var bb = {
    subaction_id: ObjectID(req.params.subaction_id),
    language: req.body.name,
    template: req.body.template,
    instructions: req.params.instructions,
    createDate: new Date()
  };

  db.collection(constants.TEMPLATES_COLLECTION).insertOne(bb, function (
    err,
    doc
  ) {
    if (err) {
      handleError(res, err.message, "Failed to create new template.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

// app.get("/api/contacts/:id", function (req, res) {
//   db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to get contact");
//     } else {
//       res.status(200).json(doc);
//     }
//   });
// });

app.put("/api/action/:id", function (req, res) {
  var updateDoc = { $set: req.body }; // { $set: { name: "Hi there" } };

  delete updateDoc._id;
  //console.log(req.params.id);

  db.collection(constants.ACTIONS_COLLECTION).updateOne(
    { _id: new ObjectID(req.params.id) },
    updateDoc,
    function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update action");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    }
  );
});

app.put("/api/template/:id", function (req, res) {
  var updateDoc = { $set: req.body }; // { $set: { name: "Hi there" } };

  delete updateDoc._id;
  //console.log(req.params.id);

  db.collection(constants.TEMPLATES_COLLECTION).updateOne(
    { _id: new ObjectID(req.params.id) },
    updateDoc,
    function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update Template");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    }
  );
});


app.put("/api/subaction/:id", function (req, res) {
  var updateDoc = { $set: req.body }; // { $set: { name: "Hi there" } };

  delete updateDoc._id;
  //console.log(req.params.id);

  db.collection(constants.SUBACTIONS_COLLECTION).updateOne(
    { _id: new ObjectID(req.params.id) },
    updateDoc,
    function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update Sub action");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    }
  );
});

app.delete("/api/action/:id", function (req, res) {
  db.collection(constants.ACTIONS_COLLECTION).deleteOne(
    { _id: new ObjectID(req.params.id) },
    function (err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact");
      } else {
        res.status(200).json(req.params.id);
      }
    }
  );
});

app.delete("/api/template/:templateid", function (req, res) {
  db.collection(constants.TEMPLATES_COLLECTION).deleteOne(
    { _id: new ObjectID(req.params.templateid) },
    function (err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact");
      } else {
        res.status(200).json(req.params.templateid);
      }
    }
  );
});

app.delete("/api/subaction/:id", function (req, res) {
  db.collection(constants.SUBACTIONS_COLLECTION).deleteOne(
    { _id: new ObjectID(req.params.id) },
    function (err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete sub action");
      } else {
        res.status(200).json(req.params.id);
      }
    }
  );
});
