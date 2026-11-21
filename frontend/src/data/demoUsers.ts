import type { User } from "@/types/UserType";

export const demoUsers: User[] = [
  // Password will == password123 for all demo users
  {
    id: "1",
    firstName: "Sean",
    lastName: "Payne",
    email: "sean.payne@example.com",
    role: "Admin",
  },
  {
    id: "2",
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@example.com",
    role: "Manager",
  },
  {
    id: "3",
    firstName: "Jordan",
    lastName: "Taylor",
    email: "jordan.taylor@example.com",
    role: "Employee",
  },
  {
    id: "4",
    firstName: "Casey",
    lastName: "Williams",
    email: "casey.williams@example.com",
    role: "Employee",
  },
  {
    id: "5",
    firstName: "Morgan",
    lastName: "Davis",
    email: "morgan.davis@example.com",
    role: "Manager",
  },
  {
    id: "6",
    firstName: "Jamie",
    lastName: "Wilson",
    email: "jamie.wilson@example.com",
    role: "Employee",
  },
];
