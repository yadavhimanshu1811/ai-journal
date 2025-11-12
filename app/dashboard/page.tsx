import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg">You are not logged in.</p>
        <Link href="/login" className="text-primary underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="text-muted-foreground">
        Logged in as: <strong>{session.user?.email}</strong>
      </p>

      <Link
        href="/new"
        className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Create New Entry
      </Link>
    </div>
  );
}