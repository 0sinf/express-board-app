import { UserRepository } from "../models/UserRepository";
import { IUserDto } from "../types/users";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userDto: IUserDto) {
    const user = await this.userRepository.save(userDto);
    return user.u_id;
  }
}
