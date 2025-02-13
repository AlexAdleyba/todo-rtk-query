export enum TaskStatus {
  New,
  InProgress,
  Completed,
}

export enum TaskPriority {
  Low,
  Middle,
  High,
  Urgently,
}

export enum ResultCode {
  Success = 0,
  Error = 1,
  CaptchaError = 10,
}
