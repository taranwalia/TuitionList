import { Mail, Search } from "lucide-react";
import { Badge, Button, Panel, inputClass } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import type { EmailLog } from "@/lib/email-logs";
import { getAdminEmailLogs } from "@/lib/email-logs";

export default async function AdminEmailLogsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const query = String(Array.isArray(params.q) ? params.q[0] : params.q ?? "").trim();
  const status = String(Array.isArray(params.status) ? params.status[0] : params.status ?? "").trim();
  let logs: EmailLog[] = [];
  let error: string | null = null;

  try {
    logs = await getAdminEmailLogs({ query, status });
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Email logs could not be loaded.";
  }

  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-900">Email logs</h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            View transactional email attempts sent by TuitionList, including account, profile review and enquiry notifications.
          </p>
        </div>

        <Panel>
          <form className="grid gap-3 lg:grid-cols-[1fr_220px_auto]" action="/admin/email-logs">
            <label className="grid gap-2 text-sm font-medium text-navy-900">
              Search emails
              <input name="q" className={inputClass} defaultValue={query} placeholder="Search by recipient or subject" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-navy-900">
              Status
              <select name="status" className={inputClass} defaultValue={status}>
                <option value="">All statuses</option>
                <option value="sent">Sent</option>
                <option value="failed">Failed</option>
                <option value="skipped">Skipped</option>
              </select>
            </label>
            <Button type="submit" className="self-end gap-2">
              <Search className="size-4" aria-hidden />
              Search
            </Button>
          </form>
        </Panel>

        {error ? (
          <Panel className="border-orange-200 bg-orange-50">
            <p className="font-semibold text-orange-900">Email logs are not ready yet.</p>
            <p className="mt-2 text-sm leading-6 text-orange-800">
              {error} Run the latest Supabase migration, then send a test email to start recording logs.
            </p>
          </Panel>
        ) : null}

        {!error && logs.length === 0 ? (
          <Panel>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 size-5 text-leaf-700" aria-hidden />
              <div>
                <p className="font-semibold text-navy-900">No email logs found.</p>
                <p className="mt-1 text-sm text-slate-600">New email attempts will appear here once transactional emails are sent.</p>
              </div>
            </div>
          </Panel>
        ) : null}

        {!error && logs.length ? (
          <Panel className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Recipient</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Provider</th>
                    <th className="px-4 py-3">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">{new Date(log.created_at).toLocaleString("en-GB")}</td>
                      <td className="px-4 py-3 font-medium text-navy-900">{log.recipient}</td>
                      <td className="px-4 py-3 text-slate-700">{log.subject}</td>
                      <td className="px-4 py-3">
                        <Badge className={statusClass(log.status)}>{log.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{log.provider}</td>
                      <td className="max-w-md px-4 py-3 text-slate-600">
                        {log.error_message || log.provider_message_id || "Recorded"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        ) : null}
      </div>
    </section>
  );
}

function statusClass(status: string) {
  if (status === "sent") return "border-green-200 bg-green-50 text-green-800";
  if (status === "failed") return "border-red-200 bg-red-50 text-red-800";
  if (status === "skipped") return "border-orange-200 bg-orange-50 text-orange-800";
  return "";
}
