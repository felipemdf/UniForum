import { COURSE } from "../../../core/entities/enums/Course";

export default class UserResponse {
  id: number;
  username: string;
  email: string;
  course: COURSE;
  period: number;
  photo: string;
}
