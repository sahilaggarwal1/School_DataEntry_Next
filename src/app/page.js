import { redirect } from "next/navigation";

export default function Home() {
  redirect("/addSchool"); // call redirect directly
}
