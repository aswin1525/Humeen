"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface UserStats {
    missionsCompleted: number;
    timeSpent: number;
    energyEarned: number;
    activityFrontend: number;
    activityBackend: number;
    activitySecurity: number;
    activityData: number;
}

interface User {
    id?: number;
    username: string;
    stats?: UserStats;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password?: string) => Promise<void>;
    register: (username: string, password?: string) => Promise<void>;
    logout: () => void;
    updateStats: (newStats: Partial<UserStats>) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check localStorage for persisted user
        const storedUser = localStorage.getItem("humeen_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const endpoint = password ? "/login" : "/register"; // Fallback if no password provided (shouldn't happen in new flow)

            const response = await fetch(`http://localhost:8080/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem("humeen_user", JSON.stringify(userData));
                router.push("/universe");
            } else {
                const errorMsg = await response.text();
                setError(errorMsg || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Network error. Is the backend running?");
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (username: string, password?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/api/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem("humeen_user", JSON.stringify(userData));
                router.push("/universe");
            } else {
                const errorMsg = await response.text();
                setError(errorMsg || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("Network error. Is the backend running?");
        } finally {
            setIsLoading(false);
        }
    };

    const updateStats = async (newStats: Partial<UserStats>) => {
        if (!user) return;
        try {
            const response = await fetch(`http://localhost:8080/api/stats/${user.username}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newStats)
            });

            if (response.ok) {
                const updatedStats = await response.json();
                const updatedUser = { ...user, stats: updatedStats };
                setUser(updatedUser);
                localStorage.setItem("humeen_user", JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Failed to sync stats:", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("humeen_user");
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateStats, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
