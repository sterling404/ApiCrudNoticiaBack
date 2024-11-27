const express = require("express");
// const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  // process.env.DATABASE_URL,
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_KEY
);
var app = express();

var jsonParser = bodyParser.json();

app.use(cors());

app.get("/", (req, res) => {
  res.send(`Blog API Working`);
});

app.get("/blogs", async (req, res) => {
  try {
    const result = await supabase.from("blogs").select();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/blogs/:id", async (req, res) => {
  try {
    const result = await supabase
      .from("blogs")
      .select()
      .eq("id", req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/blogs", jsonParser, async (req, res) => {
  try {
    const result = await supabase.from("blogs").insert({
      title: req.body.title,
      subtitle: req.body.subtitle,
      body: req.body.body,
      report_type:req.body.report_type,
      is_primary: req.body.is_primary,
      publisher_name: req.body.publisher_name,
      publisher_job: req.body.publisher_job,
    });
    res.status(200).json({
      message: "Blog was created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/blogs/:id", jsonParser, async (req, res) => {
  try {
    const result = await supabase
      .from("blogs")
      .update({
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body,
        report_type:  req.body.report_type,
        is_primary: req.body.is_primary,
        publisher_name: req.body.publisher_name,
        publisher_job: req.body.publisher_job,
      })
      .eq("id", req.params.id);
    res.status(200).json({
      message: "Blog was updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//eliminar
app.put("/blogs/:id/eliminar", jsonParser, async (req, res) => {
  try {
    const result = await supabase
      .from("blogs")
      .update({
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body,
        report_type:  req.body.report_type,
        is_primary: req.body.is_primary,
        publisher_name: req.body.publisher_name,
        publisher_job: req.body.publisher_job,
      })
      .eq("id", req.params.id);
    res.status(200).json({
      message: "Blog was updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


// Eliminar un blog
app.delete("/blogs/:id", async (req, res) => {
  try {
    // Obtén el ID del parámetro de la URL
    const blogId = req.params.id;

    // Usa Supabase para eliminar el blog
    const { data, error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", blogId);

    // Maneja posibles errores
    if (error) {
      console.error("Error al eliminar el blog:", error);
      return res.status(500).json({ message: "Error al eliminar el blog" });
    }

    // Responde con un mensaje de éxito
    res.status(200).json({
      message: "Blog was deleted successfully",
      data,
    });
  } catch (err) {
    console.error("Error interno del servidor:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

module.exports = app;