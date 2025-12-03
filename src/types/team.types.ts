export type TeamMemberRole =
  | "Admin 1"
  | "Admin 2"
  | "Admin 3"
  | "Editor 1"
  | "Editor 2"
  | "Moderator 1"
  | "Moderator 2";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  avatar?: string;
}
