export interface User {
  id: number;
  email: string;
  point: number;
  nickname: string;
  createdAt: Date;
  role: "ADMIN" | "USER";
  subscriptionType: "FREE" | "PREMIUM";
  threadsUnfollowCount: number;
  instagramUnfollowCount: number;
  instagramAutomationCount: number;
  naverAutomationCount: number;
  naverImageDownloadCount: number;
  premiumEndDate: Date;
}
