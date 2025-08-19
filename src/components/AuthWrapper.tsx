"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store/store";
import { setUser, setLoading } from "../app/store/auth";
import Navbar from "./Navbar";
import Header from "./Header";
import Loading from "./Loading";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const data = await response.json();
          dispatch(setUser(data.user));
          if (pathname === "/") {
            router.push("/dashboard");
          }
        } else {
          if (pathname !== "/") {
            router.push("/");
          }
        }
      } catch (error) {
        if (pathname !== "/") {
          router.push("/");
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch, router, pathname]);

  const isLoginPage = pathname === "/";

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!isLoginPage && isAuthenticated && <Navbar />}
      {!isLoginPage && isAuthenticated && <Header />}
      <div className={!isLoginPage && isAuthenticated ? "pt-14" : ""}>
        {children}
      </div>
    </>
  );
}
