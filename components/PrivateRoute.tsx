import React from "react";
import Layout from "@/layouts/Layout";
import { useUserData } from "@/hooks/useUserData";

interface PrivateRouteProps {
  role?: string;
  children: React.ReactNode;
}

const PrivateRoute = ({ role, children }: PrivateRouteProps) => {
  let { status, loading, session, role: userRole } = useUserData();
  console.log("status: ", status);
  console.log("loading:", loading);
  console.log("session: ", session);
  console.log("userrole: ", userRole);

  if (status === "loading" || loading)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );

  if (!session) return <UnauthorizedPage></UnauthorizedPage>;

  if (role && role !== userRole) {
    console.log("rol malo");
    return (
      <Layout>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <NotAllowedPage></NotAllowedPage>
        </div>
      </Layout>
    );
  }
  console.log("llega aqui cuando estpa todo bien");

  return <>{children}</>;
};

const UnauthorizedPage = () => (
  <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="text-base font-semibold text-indigo-600">401</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Unauthorized page
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        This route requires authentication. Please sign in.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </a>
      </div>
    </div>
  </main>
);

const NotAllowedPage = () => (
  <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="text-base font-semibold text-indigo-600">403</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Not allowed page
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        You do not have permissions to access this route.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/inventory-management"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go to the main page.
        </a>
      </div>
    </div>
  </main>
);

export default PrivateRoute;
