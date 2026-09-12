"use server";

import { getSupabase } from "@/lib/supabase";
import { validate, type FormState } from "@/lib/form";

export type SubmitResult =
  | { ok: true; stored: boolean }
  | { ok: false; message: string };

/**
 * 신청서 접수.
 *
 * Supabase 환경변수가 없으면 저장을 건너뛰고 성공 처리합니다. (stored: false)
 * 키만 채워 넣으면 이 함수를 고치지 않아도 바로 저장이 시작됩니다.
 */
export async function submitApplication(
  form: FormState,
): Promise<SubmitResult> {
  // 브라우저 검증은 우회될 수 있으므로 서버에서 다시 검증합니다.
  const errors = validate(form);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: Object.values(errors)[0] as string };
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.warn(
      "[신청] Supabase 미설정 — 저장하지 않고 접수만 처리했습니다.",
      form.email,
    );
    return { ok: true, stored: false };
  }

  const { error } = await supabase.from("applications").insert({
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    team: form.team,
    position: form.position,
    ai_experience: form.experience,
    goal: form.goal,
    dietary_notes: form.dietary.trim() || null,
  });

  if (error) {
    // 23505 = 이메일 중복 (unique 제약)
    if (error.code === "23505") {
      return { ok: false, message: "이미 신청하신 이메일입니다." };
    }
    console.error("[신청] 저장 실패", error);
    return {
      ok: false,
      message: "저장 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  return { ok: true, stored: true };
}
