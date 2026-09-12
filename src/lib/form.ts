/**
 * 신청 폼의 선택지·검증 규칙.
 * 브라우저와 서버 양쪽에서 함께 사용합니다. (서버에서도 다시 검증해야 위변조를 막을 수 있음)
 */

/**
 * 회사 이메일 검증 규칙.
 * COMPANY_DOMAINS 에 사내 도메인을 넣으면 해당 도메인만 허용합니다. (예: ["mycorp.com"])
 * 비워두면 아래 개인용 무료 메일 도메인만 차단합니다.
 */
export const COMPANY_DOMAINS: string[] = [];

const PERSONAL_DOMAINS = [
  "gmail.com",
  "naver.com",
  "daum.net",
  "hanmail.net",
  "kakao.com",
  "nate.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
];

export const TEAMS = [
  "프로덕트",
  "마케팅",
  "세일즈",
  "컨설팅",
  "개발",
  "디자인",
  "경영지원",
  "기타",
] as const;

export const POSITIONS = [
  "사원",
  "대리",
  "과장",
  "차장",
  "부장",
  "임원",
] as const;

export const AI_EXPERIENCES = [
  "처음이에요",
  "ChatGPT 정도 써봤어요",
  "Claude도 써봤어요",
  "Claude Code까지 써봤어요",
] as const;

export const GOALS = [
  "업무 자동화",
  "데이터 분석",
  "웹서비스 만들기",
  "AI 도구 전반",
  "기타",
] as const;

export type FormState = {
  name: string;
  email: string;
  team: string;
  position: string;
  experience: string;
  goal: string;
  dietary: string;
};

export const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  team: "",
  position: "",
  experience: "",
  goal: "",
  dietary: "",
};

export type Errors = Partial<Record<keyof FormState, string>>;

export function validateEmail(value: string): string | undefined {
  const email = value.trim().toLowerCase();
  if (!email) return "이메일을 입력해 주세요.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  const domain = email.split("@")[1];
  if (COMPANY_DOMAINS.length > 0) {
    if (!COMPANY_DOMAINS.includes(domain)) {
      return `회사 이메일(@${COMPANY_DOMAINS[0]})로 신청해 주세요.`;
    }
  } else if (PERSONAL_DOMAINS.includes(domain)) {
    return "개인 메일이 아닌 회사 이메일로 신청해 주세요.";
  }
  return undefined;
}

function pick(options: readonly string[], value: string, label: string) {
  if (!value) return `${label}을(를) 선택해 주세요.`;
  if (!options.includes(value)) return `${label} 값이 올바르지 않습니다.`;
  return undefined;
}

export function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "이름을 입력해 주세요.";
  else if (form.name.trim().length > 50)
    errors.name = "이름이 너무 깁니다. (50자 이내)";

  const emailError = validateEmail(form.email);
  if (emailError) errors.email = emailError;

  errors.team = pick(TEAMS, form.team, "소속 팀/부서");
  errors.position = pick(POSITIONS, form.position, "직급");
  errors.experience = pick(AI_EXPERIENCES, form.experience, "AI 도구 사용 경험");
  errors.goal = pick(GOALS, form.goal, "배우고 싶은 것");

  if (form.dietary.trim().length > 500)
    errors.dietary = "500자 이내로 입력해 주세요.";

  // undefined 값 제거 — 남은 키가 없으면 통과
  for (const key of Object.keys(errors) as (keyof Errors)[]) {
    if (!errors[key]) delete errors[key];
  }
  return errors;
}
