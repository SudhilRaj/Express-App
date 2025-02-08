export const uploadFile = (req, res) => {
   console.log(req)
   try {
      if (!req.file) {
         return res.status(400).send('No file uploaded.');
      }
      res.status(200).json({
         message: 'File uploaded successfully',
         file: req.file,
      });
   } catch (err) {
      res.status(500).send(err.message);
   }
}

export const uploadMultiple = (req, res) => {
   try {
      if (!req.files || req.files.length === 0) {
         return res.status(400).json({ message: 'No files uploaded!' });
      }
      res.status(200).json({
         message: 'Files uploaded successfully',
         files: req.files,
      });
   } catch (err) {
      res.status(500).send(err.message);
   }
}

export const fileDownload = (req, res) => {
   try {
      const filename = req.params.filename;
      const filePath = `uploads/${filename}`;

      res.download(filePath, (err) => {
         if (err) {
            console.error('File not found:', err);
            res.status(404).send('File not found');
         }
      });
   } catch (err) {
      res.status(500).send(err.message);
   }
}

// module.exports = { uploadFile, uploadMultiple }