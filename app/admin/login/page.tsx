import { LoginFormLink } from "@/components/login-form-link";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return <LoginFormLink title="Admin login" destination="/admin" error={error} />;
}
