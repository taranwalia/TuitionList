function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function siteUrl(path = "/") {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tuitionlist.co.uk";
  return new URL(path, baseUrl).toString();
}

function layout(title: string, body: string) {
  return `
    <div style="font-family: Arial, sans-serif; color: #0b2545; line-height: 1.6; max-width: 640px;">
      <h1 style="font-size: 24px; margin: 0 0 16px;">${escapeHtml(title)}</h1>
      ${body}
      <hr style="border: 0; border-top: 1px solid #d9e2ec; margin: 24px 0;" />
      <p style="font-size: 12px; color: #52606d;">
        TuitionList is an online directory only. Tutors and tuition providers are independent and are not employed, managed,
        supervised, or endorsed by TuitionList.
      </p>
    </div>
  `;
}

function button(label: string, href: string) {
  return `
    <p style="margin: 20px 0;">
      <a href="${escapeHtml(href)}" style="background: #0b2545; color: #ffffff; display: inline-block; padding: 10px 14px; border-radius: 6px; text-decoration: none; font-weight: 700;">
        ${escapeHtml(label)}
      </a>
    </p>
  `;
}

export function accountCreatedEmail() {
  return {
    subject: "Your TuitionList account has been created",
    html: layout(
      "Your TuitionList account has been created",
      `
        <p>Thanks for creating a TuitionList tutor account.</p>
        <p>You can now complete your tutor profile and submit it for admin review. Your profile will not appear publicly until it has been approved.</p>
        ${button("Complete your tutor profile", siteUrl("/tutor-dashboard/profile"))}
      `
    )
  };
}

export function profileSubmittedEmail(displayName: string) {
  return {
    subject: "Your TuitionList profile is pending review",
    html: layout(
      "Your profile is pending review",
      `
        <p>Thanks. We have received the tutor profile for <strong>${escapeHtml(displayName)}</strong>.</p>
        <p>The profile is now pending admin review. It will not appear publicly until it has been approved.</p>
        ${button("View your dashboard", siteUrl("/tutor-dashboard"))}
      `
    )
  };
}

export function adminProfileSubmittedEmail(displayName: string) {
  return {
    subject: "New tutor profile awaiting approval",
    html: layout(
      "New tutor profile awaiting approval",
      `
        <p><strong>${escapeHtml(displayName)}</strong> has submitted a TuitionList profile for review.</p>
        ${button("Review pending tutors", siteUrl("/admin/tutors/pending"))}
      `
    )
  };
}

export function profileApprovedEmail(displayName: string) {
  return {
    subject: "Your TuitionList profile has been approved",
    html: layout(
      "Your profile has been approved",
      `
        <p>Good news. The tutor profile for <strong>${escapeHtml(displayName)}</strong> has been approved and can now appear on TuitionList.</p>
        <p>Parents, carers, and students can send enquiries through your profile.</p>
        ${button("View your dashboard", siteUrl("/tutor-dashboard"))}
      `
    )
  };
}

export function profileRejectedEmail(displayName: string, reason?: string) {
  const reasonHtml = reason?.trim()
    ? `<p><strong>Reason or notes from admin:</strong><br />${escapeHtml(reason.trim())}</p>`
    : "<p>Please contact TuitionList if you need more information about what to change.</p>";

  return {
    subject: "Your TuitionList profile needs changes",
    html: layout(
      "Your profile needs changes",
      `
        <p>The tutor profile for <strong>${escapeHtml(displayName)}</strong> has not been approved yet.</p>
        ${reasonHtml}
        <p>You can update your profile and submit it again for review.</p>
        ${button("Edit your profile", siteUrl("/tutor-dashboard/profile"))}
      `
    )
  };
}

export function profileSuspendedEmail(displayName: string) {
  return {
    subject: "Your TuitionList profile has been suspended",
    html: layout(
      "Your profile has been suspended",
      `
        <p>The tutor profile for <strong>${escapeHtml(displayName)}</strong> has been suspended and will not appear publicly.</p>
        <p>Please contact TuitionList if you believe this needs to be reviewed.</p>
      `
    )
  };
}

export function accountDeletedEmail(displayName: string) {
  return {
    subject: "Your TuitionList account has been deleted",
    html: layout(
      "Your TuitionList account has been deleted",
      `
        <p>The TuitionList account and tutor profile for <strong>${escapeHtml(displayName)}</strong> have been deleted.</p>
        <p>If you believe this was a mistake, please contact TuitionList.</p>
      `
    )
  };
}

export function parentEnquiryTutorEmail(parentName: string, message: string) {
  return {
    subject: "New TuitionList parent enquiry",
    html: layout(
      "New parent enquiry",
      `
        <p>You have a new enquiry from <strong>${escapeHtml(parentName)}</strong>.</p>
        <p>${escapeHtml(message)}</p>
        ${button("View enquiries", siteUrl("/tutor-dashboard/enquiries"))}
      `
    )
  };
}

export function parentEnquiryAdminEmail(tutorId: string, parentName: string, message: string) {
  return {
    subject: "New TuitionList parent enquiry",
    html: layout(
      "New parent enquiry",
      `
        <p>A new enquiry was submitted for tutor profile <strong>${escapeHtml(tutorId)}</strong>.</p>
        <p><strong>Parent/student:</strong> ${escapeHtml(parentName)}</p>
        <p>${escapeHtml(message)}</p>
        ${button("View enquiries", siteUrl("/admin/enquiries"))}
      `
    )
  };
}

export function parentEnquiryConfirmationEmail() {
  return {
    subject: "Your TuitionList enquiry has been sent",
    html: layout(
      "Your enquiry has been sent",
      `
        <p>Thanks. Your enquiry has been submitted.</p>
        <p>The tutor should respond directly if they are available and interested. Please remember to carry out your own checks before arranging tuition.</p>
      `
    )
  };
}
