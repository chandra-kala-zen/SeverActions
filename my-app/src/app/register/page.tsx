'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Register() {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const form = e.currentTarget;
        const email = form.elements.namedItem('email') as HTMLInputElement;
        const password = form.elements.namedItem('password') as HTMLInputElement;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            });

            if (res.status === 400) {
                setError("This email is already registered.");
            } else if (res.status === 201) {
                setSuccess("User created successfully!");
                setTimeout(() => {
                    router.push("/login");
                }, 2000); // Wait 2 seconds before redirecting
            } else {
                setError("Failed to create an account. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="w-[500px] m-auto bg-[#212121]">
            <form onSubmit={handleSubmit} className=" flex flex-col border-2 p-4 space-y-4">
            <h1 className="text-center font-bold">Register</h1>

                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="p-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <Link className="text-blue-400 hover:text-orange-400" href="/login">
                    Login into existing account
                </Link>
            </form>
        </div>
    );
}

export default Register;
