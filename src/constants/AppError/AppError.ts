// 던질 수 있는 운영 에러. 모든 도메인 서비스에서 사용.
export class AppError extends Error {
  constructor(
    public status: number, // 400/401/404 ...
    public code: string, // 'ACADEMY_NOT_FOUND' 등
    message: string,
  ) {
    super(message);
  }
}
