import { User } from "@/model/user";

export interface Room {
  room: string;
  Receiver: User;
  Sender: User;
  content: string;
  createdAt: Date;
}
