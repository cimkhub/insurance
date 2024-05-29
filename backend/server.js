const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploadPath = path.join(__dirname, 'uploads', req.files.file.name);

  req.files.file.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    const process = spawn('python3', [path.join(__dirname, 'preprocess.py'), uploadPath]);

    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);

      fs.readFile(path.join(__dirname, 'uploads', 'insurance_data_original.json'), 'utf8', (err, originalData) => {
        if (err) {
          return res.status(500).send(err);
        }

        fs.readFile(path.join(__dirname, 'uploads', 'insurance_data_processed.json'), 'utf8', (err, processedData) => {
          if (err) {
            return res.status(500).send(err);
          }

          try {
            const original = JSON.parse(originalData);
            const processed = JSON.parse(processedData);

            res.json({
              original: {
                columns: original.columns,
                data: original.data
              },
              processed: {
                columns: processed.columns,
                data: processed.data
              }
            });
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Error parsing JSON.');
          }
        });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
});
