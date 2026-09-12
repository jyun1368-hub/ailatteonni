-- 신청자 테이블
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 Run 하면 됩니다.

create table if not exists public.applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null unique,          -- 중복 신청 방지
  team          text not null,
  position      text not null,
  ai_experience text not null,
  goal          text not null,
  dietary_notes text
);

-- RLS(행 수준 보안) 활성화.
-- 정책을 하나도 만들지 않았으므로 외부에서는 읽기도 쓰기도 전부 차단됩니다.
-- 저장은 서버의 service_role 키로만 이뤄지고(RLS 우회), 조회는 대시보드 로그인으로만 가능합니다.
alter table public.applications enable row level security;

-- 최근 신청자부터 조회할 때 쓰는 인덱스
create index if not exists applications_created_at_idx
  on public.applications (created_at desc);
