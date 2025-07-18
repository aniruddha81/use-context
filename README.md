# 🧠 আজকে আমি শিখলাম: React-এর Context API কীভাবে কাজ করে

আমি এর আগেও কয়েকবার React এর Context API শেখার চেষ্টা করেছিলাম, কিন্তু তখন ঠিকভাবে বুঝতে পারিনি।  
আজকে অবশেষে আমি বুঝতে পেরেছি এই কনসেপ্টটা কীভাবে কাজ করে, এবং সেটা আমি এখানে সহজভাবে শেয়ার করছি।

---

## 🧩 Context API কী?

Context API মূলত React অ্যাপের ভেতরে কোনো তথ্যকে একটা কম্পোনেন্ট থেকে অনেক লেভেল নিচের আরেকটা কম্পোনেন্টে পাঠানোর সুবিধা দেয়।  
যেমন ধরো — ইউজার লগ ইন করা আছে কি না, সেটা পুরো অ্যাপে কিভাবে জানানো যায়? এর সমাধান হলো Context API।

---

## 🗂️ আমি নিচের চারটি ফাইল ব্যবহার করেছি:

1. `UserContext.js`
2. `UserContextProvider.js`
3. `Login.js`
4. `Profile.js`

---

### 1️⃣ UserContext.js

```js
import { createContext } from "react";
const UserContext = createContext(null);
export default UserContext;
```
এখানে আমরা একটি Context তৈরি করেছি যা পরে অন্য জায়গায় ব্যবহার করবো।

---

### 2️⃣ UserContextProvider.js

```js
import { useState } from "react";
import UserContext from "./UserContext";

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
```
এই কম্পোনেন্টের মাধ্যমে আমরা পুরো অ্যাপে user ডেটা access ও modify করতে পারি।

---

### 3️⃣ Login.js

```js
import { useState, useContext } from "react";
import UserContext from "./UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username, pass });
  };

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={pass} onChange={(e) => setPass(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```
এখানে ইউজার ইনপুট নিয়ে setUser এর মাধ্যমে Provider-এ পাঠানো হচ্ছে।

---

### 4️⃣ Profile.js

```js
import { useContext } from "react";
import UserContext from "./UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);

  return user ? (
    <div>Welcome {user.username}</div>
  ) : (
    <div>Please login</div>
  );
}
```
যদি ইউজার লগ ইন করা থাকে, তাহলে তার নাম দেখাবে। না থাকলে "Please login" দেখাবে।

---

## 🏠 অবশেষে App/Home ফাইল:

```js
import UserContextProvider from "./UserContextProvider";
import Login from "./Login";
import Profile from "./Profile";

export default function Home() {
  return (
    <UserContextProvider>
      <h1>Hello World</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  );
}
```
এই ফাইলে আমরা UserContextProvider দিয়ে পুরো অ্যাপকে ঘিরে রেখেছি, যাতে ভিতরের সব কম্পোনেন্ট Context ব্যবহার করতে পারে।

---

## 🧾 শেষ কথা

React-এর Context API দিয়ে খুব সহজে গ্লোবাল ডেটা ম্যানেজ করা যায়।  
আজ আমি এর বেসিক কনসেপ্টটা প্র্যাকটিক্যালি শিখে ফেললাম। আশা করি, আমার মতো যারা আগে বুঝতে পারেননি, তাদের জন্য এই পোস্টটা কাজে আসবে।

---

🔁 চাইলে এই কনসেপ্ট দিয়েই Redux ছাড়া ছোট অ্যাপে user authentication, theme management, বা language switch-এর মতো কাজ করা যায়।
