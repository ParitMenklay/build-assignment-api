import express from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = 4001;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.post("/assignments", async (req, res) => {
  try {
    const { title, content, category, length, user_id, status } = req.body;

    // ✅ 1. validate input (400)
    if (!title || !content || !category) {
      return res.status(400).json({
        message:
          "Server could not create assignment because there are missing data from client",
      });
    }

    // optional fields
    const newAssignment = {
      title,
      content,
      category,
      length: length || null,
      user_id: user_id || null,
      status: status || "draft",
    };

    // ✅ 2. insert database
    await connectionPool.query(
      `
      INSERT INTO assignments (title, content, category, length, user_id, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        newAssignment.title,
        newAssignment.content,
        newAssignment.category,
        newAssignment.length,
        newAssignment.user_id,
        newAssignment.status,
      ]
    );

    // ✅ 3. success
    res.status(201).json({
      message: "Created assignment successfully",
    });
  } catch (error) {
    console.error(error);

    // ❌ 4. server / database error (500)
    res.status(500).json({
      message: "Server could not create assignment because database connection",
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
