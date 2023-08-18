import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: { type: String,  },
    avatarUrl: String,
    socialOnly: { type: Boolean, default: false },
    username: { type: String,  },
    password: {type: String },
    name: {type: String, },
    location: String,
})

userSchema.pre('save', async function() {
    console.log("Original password:", this.password) // Original password: 1234
    this.password = await bcrypt.hash(this.password, 5); // await 키워드가 있을 경우, hash()메서드의 콜백함수 생략 가능
    console.log("Hashed password:", this.password) // Hashed password: $2b$05$Mf2tUsdni7.StdAoqFPf6uSPa8oYMG7ky4ZwPYBu2IpkV4xnNJTiq
})

const User = mongoose.model('User', userSchema)
export default User;