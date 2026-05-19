const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const db = require("./db");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ================= MULTER ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),

  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

/* ================= LOGIN ================= */

app.post("/api/auth/login", (req, res) => {

  const { username, password } = req.body;

  db.query(
    "SELECT * FROM personnel WHERE username=? AND password=?",
    [username, password],

    (err, personnel) => {

      if (err) return res.status(500).send(err);

      if (personnel.length > 0) {

        return res.send({
          message: "Personnel login successful",
          user: {
            ...personnel[0],
            role: "personnel"
          }
        });

      }

      db.query(
        "SELECT * FROM complainant WHERE username=? AND password=?",
        [username, password],

        (err2, complainant) => {

          if (err2) return res.status(500).send(err2);

          if (complainant.length > 0) {

            return res.send({
              message: "Complainant login successful",
              user: {
                ...complainant[0],
                role: "complainant"
              }
            });

          }

          return res.status(401).send({ message: "Invalid credentials" });

        }
      );

    }
  );

});

/* =========================================================
   COMPLAINANT CRUD
========================================================= */

app.get("/api/complainants", (req, res) => {

  db.query("SELECT * FROM complainant", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });

});

app.post("/api/complainants", (req, res) => {

  const {
    complainant_id,
    complainant_name,
    email,
    phone_number,
    address,
    civil_status,
    gender,
    username,
    password
  } = req.body;

  db.query(
    `
    INSERT INTO complainant
    (
      complainant_id,
      complainant_name,
      email,
      phone_number,
      address,
      civil_status,
      gender,
      username,
      password
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      complainant_id,
      complainant_name,
      email,
      phone_number,
      address,
      civil_status,
      gender,
      username,
      password
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Complainant created successfully" });
    }
  );

});

/* =========================================================
   REPORTS
========================================================= */
app.get("/api/reports", (req, res) => {

  db.query(
    `
    SELECT
      r.report_id,
      r.title,
      r.description,
      r.location,
      r.date,
      r.status,
      r.photo_path,
      r.complainant_id,

      c.complainant_name,

      cat.category_name,
      cat.category_title,

      rt.action_description

    FROM report r

    LEFT JOIN complainant c
      ON r.complainant_id = c.complainant_id

    LEFT JOIN category cat
      ON CAST(r.category_id AS CHAR) = CAST(cat.category_id AS CHAR)

    LEFT JOIN report_tracking rt
      ON r.report_id = rt.report_id
      AND rt.date_updated = (
        SELECT MAX(date_updated)
        FROM report_tracking
        WHERE report_id = r.report_id
      )

    ORDER BY r.date DESC
    `,
    (err, result) => {

      if (err) {
        console.log("REPORT FETCH ERROR:", err);
        return res.status(500).send(err);
      }

      res.send(result);
    }
  );

});

app.post("/api/signup", (req, res) => {

  const {
    complainant_name,
    email,
    phone_number,
    address,
    civil_status,
    gender,
    username,
    password
  } = req.body;

  // STEP 1: get last comp ID
  db.query(
    "SELECT complainant_id FROM complainant WHERE complainant_id LIKE 'comp%' ORDER BY CAST(SUBSTRING(complainant_id,5) AS UNSIGNED) DESC LIMIT 1",
    (err, rows) => {

      if (err) return res.status(500).send(err);

      let next = 1;

      if (rows.length > 0 && rows[0].complainant_id) {
        const num = parseInt(rows[0].complainant_id.replace(/\D/g, ""), 10);
        if (!isNaN(num)) next = num + 1;
      }

      const complainant_id = `comp${String(next).padStart(3, "0")}`;

      // STEP 2: insert complainant
      const sql = `
        INSERT INTO complainant
        (
          complainant_id,
          complainant_name,
          email,
          phone_number,
          address,
          civil_status,
          gender,
          username,
          password
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [
          complainant_id,
          complainant_name,
          email,
          phone_number,
          address,
          civil_status,
          gender,
          username,
          password
        ],
        (err2) => {

          if (err2) {
            console.log("SIGNUP ERROR:", err2);

            return res.status(500).send({
              message: "Signup failed",
              error: err2.sqlMessage
            });
          }

          res.send({
            message: "Signup successful",
            complainant_id
          });

        }
      );

    }
  );
});
/* ================= CREATE REPORT (FIXED + REP ID GENERATOR) ================= */
app.post("/api/reports", upload.single("photo"), (req, res) => {

  const {
    title,
    description,
    location,
    date,
    category_title,
    category_name,
    complainant_id
  } = req.body;

  const photo = req.file ? req.file.filename : null;

  // STEP 1: get category_id
  db.query(
    "SELECT category_id FROM category WHERE category_name=? AND category_title=? LIMIT 1",
    [category_name, category_title],
    (err, cat) => {

      if (err) return res.status(500).send(err);

      if (!cat.length) {
        return res.status(400).send({ message: "Invalid category" });
      }

      const category_id = cat[0].category_id;

      // STEP 2: generate NEXT ID safely
db.query(
  "SELECT report_id FROM report ORDER BY CAST(SUBSTRING(report_id,4) AS UNSIGNED) DESC LIMIT 1",
  (err, rows) => {

    if (err) return res.status(500).send(err);

    let next = 1;

    if (rows.length > 0 && rows[0].report_id) {
      const num = parseInt(rows[0].report_id.replace(/\D/g, ""), 10);

      if (!isNaN(num)) next = num + 1;
    }

    const report_id = `rep${String(next).padStart(3, "0")}`;

    console.log("GENERATED ID:", report_id);

          // STEP 3: INSERT
          db.query(
            `
              INSERT INTO report
              (
                report_id,
                title,
                description,
                location,
                date,
                status,
                photo_path,
                category_id,
                complainant_id
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
              report_id,
              title,
              description,
              location,
              date || new Date(),
              "New",
              photo,
              category_id,
              complainant_id
            ],
            (err3) => {

              if (err3) {
                console.log("INSERT ERROR:", err3);
                return res.status(500).send(err3);
              }

              return res.send({
                message: "Report created successfully",
                report_id
              });
            }
          );

        }
      );
    }
  );
});
/* ================= UPDATE REPORT ================= */

app.put("/api/reports/:id", (req, res) => {

  const {
    title,
    description,
    location,
    status,
    category_id,
    complainant_id,
    action_description
  } = req.body;

  const report_id = req.params.id;

  const sql = `
    UPDATE report
    SET
      title=?,
      description=?,
      location=?,
      status=?,
      category_id=?,
      complainant_id=?
    WHERE report_id=?
  `;

  db.query(
    sql,
    [
      title,
      description,
      location,
      status,
      category_id,
      complainant_id,
      report_id
    ],
    (err) => {

      if (err) return res.status(500).send(err);

      const trackingSql = `
        INSERT INTO report_tracking
        (
          update_id,
          report_id,
          status,
          action_description,
          date_updated
        )
        VALUES (?, ?, ?, ?, CURDATE())
      `;

      db.query(
        trackingSql,
        [
          "UPD" + Date.now(),
          report_id,
          status,
          action_description || ""
        ],
        (err2) => {
          if (err2) return res.status(500).send(err2);

          res.send({ message: "Report updated successfully" });
        }
      );

    }
  );

});

/* ================= MY REPORTS ================= */

app.get("/api/my-reports/:id", (req, res) => {

  db.query(
    `
    SELECT 
      r.report_id,
      r.title,
      r.photo_path,
      r.status,
      r.date,

      cat.category_title,
      cat.category_name,

      rt.action_description

    FROM report r
    LEFT JOIN category cat 
      ON r.category_id = cat.category_id

    LEFT JOIN report_tracking rt
      ON r.report_id = rt.report_id
      AND rt.date_updated = (
        SELECT MAX(date_updated)
        FROM report_tracking
        WHERE report_id = r.report_id
      )

    WHERE r.complainant_id = ?
    ORDER BY r.date DESC
    `,
    [req.params.id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.send(result);
    }
  );
});

/* ================= DELETE REPORT ================= */

app.delete("/api/reports/:id", (req, res) => {

  db.query(
    "DELETE FROM report WHERE report_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Deleted" });
    }
  );

});

/* ================= DASHBOARD SUMMARY ================= */

app.get("/api/dashboard/summary", (req, res) => {

  const summary = {};

  db.query("SELECT COUNT(*) AS total FROM report", (err, total) => {

    if (err) return res.status(500).send(err);

    summary.totalReports = total[0].total;

    db.query(
      `SELECT status, COUNT(*) as count FROM report GROUP BY status`,
      (err2, status) => {

        if (err2) return res.status(500).send(err2);

        summary.newCount = 0;
        summary.pendingCount = 0;
        summary.ongoingCount = 0;
        summary.resolvedCount = 0;

        status.forEach((r) => {
          summary[`${r.status.toLowerCase()}Count`] = r.count;
        });

        db.query(
          `
          SELECT COUNT(*) AS total
          FROM report r
          JOIN category c ON r.category_id = c.category_id
          WHERE LOWER(c.category_title)='incident'
          `,
          (err3, inc) => {

            if (err3) return res.status(500).send(err3);

            summary.totalIncidents = inc[0].total;

            db.query(
              `
              SELECT COUNT(*) AS total
              FROM report r
              JOIN category c ON r.category_id = c.category_id
              WHERE LOWER(c.category_title)='complaint'
              `,
              (err4, comp) => {

                if (err4) return res.status(500).send(err4);

                summary.totalComplaints = comp[0].total;

                res.json(summary);

              }
            );

          }
        );

      }
    );

  });

});

/* ================= CATEGORY DROPDOWN ================= */

app.get("/api/categories/:type", (req, res) => {

  const categories = {
    complaint: [
      "Community & Neighborhood",
      "Behavioral Conduct",
      "Environmental Concerns",
      "Others"
    ],
    incident: [
      "Public Safety & Security",
      "Animal-Related Incidents",
      "Public Disturbance",
      "Others"
    ]
  };

  res.send(categories[req.params.type.toLowerCase()] || []);

});

/* ================= PERSONNEL CRUD ================= */

app.get("/api/personnel", (req, res) => {
  db.query("SELECT * FROM personnel", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.post("/api/personnel", (req, res) => {
  const {
    personnel_id,
    personnel_name,
    designation,
    username,
    password
  } = req.body;

  db.query(
    `INSERT INTO personnel
    (personnel_id, personnel_name, designation, username, password)
    VALUES (?, ?, ?, ?, ?)`,
    [
      personnel_id,
      personnel_name,
      designation,
      username,
      password
    ],
    (err) => {
      if (err) return res.status(500).send(err);

      res.send({ message: "Personnel created successfully" });
    }
  );
});

app.put("/api/personnel/:id", (req, res) => {
  const {
    personnel_name,
    designation,
    username,
    password
  } = req.body;

  db.query(
    `UPDATE personnel
     SET personnel_name=?, designation=?, username=?, password=?
     WHERE personnel_id=?`,
    [
      personnel_name,
      designation,
      username,
      password,
      req.params.id
    ],
    (err) => {
      if (err) return res.status(500).send(err);

      res.send({ message: "Updated successfully" });
    }
  );
});

app.delete("/api/personnel/:id", (req, res) => {
  db.query(
    "DELETE FROM personnel WHERE personnel_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);

      res.send({ message: "Deleted successfully" });
    }
  );
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});