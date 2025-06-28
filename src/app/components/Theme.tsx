"use client";
import React, { useState, useEffect } from "react";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import { db } from "@/firebase"; // Firebase configuration
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore functions
import { useSession } from "next-auth/react"; // Get user session

const Theme = () => {
  const { data: session } = useSession();
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const fetchTheme = async () => {
      if (session?.user?.email) {
        const userRef = doc(db, "users", session.user.email);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData?.theme) {
              setTheme(userData.theme);
              // Apply the theme
              if (userData.theme === "dark") {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            } else {
              // Default to dark if no theme found
              setTheme("dark");
              document.documentElement.classList.add("dark");
            }
          } else {
            // If document doesn't exist, default to dark theme
            setTheme("dark");
            document.documentElement.classList.add("dark");
          }
        } catch (error) {
          console.error("Error fetching theme:", error);
          setTheme("dark"); // Default to dark theme if there's an error
          document.documentElement.classList.add("dark");
        }
      }
    };

    // Check if theme is stored in localStorage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Fetch theme from Firestore
      fetchTheme();
    }
  }, [session]);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Update HTML class for dark mode
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save the new theme to Firestore
    if (session?.user?.email) {
      const userRef = doc(db, "users", session.user.email);
      await updateDoc(userRef, { theme: newTheme });
    }

    // Save the new theme to localStorage for persistence
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex flex-row items-center justify-between h-8 w-full">
      <button
        className="bg-proFill text-iconColorsFunctional text-sm rounded-md p-2"
        onClick={toggleTheme}
      >
        {theme === "light" ? <IoIosSunny size={24} /> : <IoMdMoon size={24} />}
      </button>
    </div>
  );
};

export default Theme;
