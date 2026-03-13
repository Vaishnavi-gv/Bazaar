import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await api.get(`/user/verify-email/${token}`);
        setMessage(res.data.message || "Email verified successfully");
      } catch (err: any) {
        setMessage(err.response?.data?.message || "Verification failed");
      }
    })();
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
}