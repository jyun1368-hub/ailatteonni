import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * 서버 전용 Supabase 클라이언트.
 *
 * service_role 키는 DB의 모든 권한을 가진 마스터 열쇠입니다.
 * "server-only" 덕분에 이 파일을 브라우저 쪽 코드에서 import 하면 빌드가 실패하므로,
 * 키가 신청자 브라우저로 새어나갈 수 없습니다.
 */
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Supabase 환경변수가 설정돼 있는지 여부 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
