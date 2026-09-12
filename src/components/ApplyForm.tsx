"use client";

import { useState, useTransition } from "react";

import { submitApplication } from "@/app/actions";
import {
  AI_EXPERIENCES,
  EMPTY_FORM,
  GOALS,
  POSITIONS,
  TEAMS,
  validate,
  type Errors,
  type FormState,
} from "@/lib/form";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition focus:border-pink-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-pink-500/15 disabled:opacity-50";

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-1.5 text-sm font-medium text-white/80"
    >
      {children}
      {optional ? (
        <span className="text-xs font-normal text-white/35">(선택)</span>
      ) : (
        <span className="text-pink-400">*</span>
      )}
    </label>
  );
}

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-rose-400">{children}</p>;
}

export default function ApplyForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitError(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startTransition(async () => {
      const result = await submitApplication(form);
      if (result.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(result.message);
      }
    });
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-3xl border border-pink-400/25 bg-gradient-to-b from-pink-500/15 to-white/[0.02] p-10 text-center"
      >
        <p className="text-5xl">🎉</p>
        <h3 className="mt-5 text-2xl font-bold text-white">
          신청이 완료되었습니다!
        </h3>
        <p className="mt-3 text-[15px] text-white/60">
          당일 노트북 꼭 챙겨오세요.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY_FORM);
            setErrors({});
            setSubmitError(null);
            setSubmitted(false);
          }}
          className="mt-8 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
        >
          다른 사람 신청하기
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-9"
    >
      <fieldset disabled={pending} className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <Label htmlFor="name">이름</Label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="홍길동"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClass}
          />
          <ErrorText>{errors.name}</ErrorText>
        </div>

        <div className="sm:col-span-1">
          <Label htmlFor="email">이메일</Label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass}
          />
          <ErrorText>{errors.email}</ErrorText>
        </div>

        <div>
          <Label htmlFor="team">소속 팀/부서</Label>
          <select
            id="team"
            name="team"
            value={form.team}
            onChange={(e) => update("team", e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            <option value="">선택해 주세요</option>
            {TEAMS.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <ErrorText>{errors.team}</ErrorText>
        </div>

        <div>
          <Label htmlFor="position">직급</Label>
          <select
            id="position"
            name="position"
            value={form.position}
            onChange={(e) => update("position", e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            <option value="">선택해 주세요</option>
            {POSITIONS.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
          <ErrorText>{errors.position}</ErrorText>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="experience">AI 도구 사용 경험</Label>
          <select
            id="experience"
            name="experience"
            value={form.experience}
            onChange={(e) => update("experience", e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            <option value="">선택해 주세요</option>
            {AI_EXPERIENCES.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
          <ErrorText>{errors.experience}</ErrorText>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="goal">강의에서 가장 배우고 싶은 것</Label>
          <select
            id="goal"
            name="goal"
            value={form.goal}
            onChange={(e) => update("goal", e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            <option value="">선택해 주세요</option>
            {GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
          <ErrorText>{errors.goal}</ErrorText>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="dietary" optional>
            식이 제한이나 알레르기
          </Label>
          <input
            id="dietary"
            name="dietary"
            type="text"
            placeholder="간식 준비 참고용"
            value={form.dietary}
            onChange={(e) => update("dietary", e.target.value)}
            className={fieldClass}
          />
          <ErrorText>{errors.dietary}</ErrorText>
        </div>
      </fieldset>

      {submitError && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-8 w-full rounded-xl bg-pink-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-pink-500/50"
      >
        {pending ? "신청 중…" : "신청하기"}
      </button>
    </form>
  );
}
