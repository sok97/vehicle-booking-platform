import mongoose from "mongoose";
interface IUser {
    name: string;
    email: string;
    role: "user" | "admin" | "partner";
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin", "partner"], default: "user" },
    password: { type: String, required: true },
}, { timestamps: true });
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema); // User re check kare ki se model already exist kare ki nahi, jadi kare tahele se use kare, nahi tahele se nija model create kare. Eha mongoose v5 re common practice hela, jaha ki hot reload environment re model redefinition error ko avoid kariba pain upayogi hela.
export default User;