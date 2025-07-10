"use client";

import { useParams } from "next/navigation";
import { listItem } from "../data";
import Link from "next/link";
import "../mail.css";
import { IoCalendarClearOutline } from "react-icons/io5";

export default function MailDetailPage() {
  const { mail } = useParams();
  const mail_detail = listItem.find((m) => m.mail_idx === Number(mail));

  if (!mail_detail)
    return (
      <div className={styles["not-found"]}>메일을 찾을 수 없습니다.</div>
    );

  const isTemplate = !!mail_detail.tem_idx;

  const subject = isTemplate ? mail_detail.mail_sub : mail_detail.mail_sub;
  const content = isTemplate
    ? mail_detail.mail_content?.[0]?.tem_body || "<p>템플릿 본문이 없습니다.</p>"
    : mail_detail.mail_content;

  return (
    <div className={"mailDetail-container"}>
      <h1 className={"mailDetail-title"}>📨 발신 메일 상세보기</h1>

      <div className={"mailDetail-card"}>
        <Link href="/mail_list">
          <button className={"mailDetail-backBtn"}>← 리스트로 돌아가기</button>
        </Link>

        <section className={"mailDetail-section"}>
          <h2 className={"mailDetail-subject"}>📧 {subject}</h2>
          <p className={"mailDetail-meta"}>
            수신 대상:{" "}
            <span>
              {mail_detail.recipient}
            </span>
          </p>
          <p className={"mailDetail-meta"}>
            담당자 ID: <span>{mail_detail.member_id}</span>
          </p>
          <div className={"mailDetail-date"}>
            <IoCalendarClearOutline />
            <span>{mail_detail.mail_date}</span>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}