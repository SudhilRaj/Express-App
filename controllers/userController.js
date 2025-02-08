import { addUser, editUser, fetchUsers } from "../services/userServices.js";

const getUsers = async (req, res) => {
   // getUsers service
   try {
      const users = await fetchUsers();
      res.status(201).json({ users })
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

const createUser = async (req, res) => {
   // All the conditions and validations here
   // Call the corresponding service to createUser
   // Finally based on the service results return the response with status
   // Basically a try/catch is preferrable here
   const { name, email } = req.body;
   try {
      const user = await addUser(name, email);
      res.status(201).json({ status: "success", message: `${user.name} created!` });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }

   // res.send(`${user.name} created!`) //For reference - json preferred
   // res.status(201).json({ status: "success", message: `${user.name} created!` });
}

const updateUser = async (req, res) => {
   try {
      const { userId } = req.params;
      const { name, email, role } = req.body;

      if (!userId) {
         return res.status(400).json({ status: "error", message: "userId is required" });
      }

      const values = [name, email, role, userId];
      const { rowCount, rows } = await editUser(values);

      if (rowCount === 0) {
         return res.status(404).json({ status: "error", message: "User not found" });
      }

      res.status(200).json({ status: "success", message: "User updated successfully!", user: rows[0] });

   } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
   }
}


export { getUsers, createUser, updateUser }
// module.exports = { getUsers, createUser, updateUser }