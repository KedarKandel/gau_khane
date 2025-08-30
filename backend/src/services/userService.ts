import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { usersTable } from "../db/schema/users.ts";

export const deleteUser = async (id: string) => {
  try {
    const deleted = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    if (deleted.length === 0) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "User deleted successfully", user: deleted[0] };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Server error" };
  }
};
