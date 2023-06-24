// pages/api/usersdata/[id].ts
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export default async function handler(req: any, res: any) {
  const { id } = req.query;

  try {
    // Connect to the database
    await connectDB();

    if (req.method === "GET") {
      // Fetch user by ID
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } else if (req.method === "PUT") {
      // Update a user
      const { fullName, email, phone, age, password, role, status } = req.body;
      const updatedUser = { fullName, email, phone, age, password, role, status };

      const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);

    } else if (req.method === "DELETE") {
      // Delete a user
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling user details:", error);
    res.status(500).json({ error: "Server error" });
  }
}
