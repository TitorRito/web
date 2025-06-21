"use client";
import { UserProvider } from '@/lib/UserContext';

export default function DappLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
