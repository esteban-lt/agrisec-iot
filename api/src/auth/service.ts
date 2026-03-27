import { JWT } from "../config/jwt";
import { ResponseError } from "../utils/response-error";
import { AuthRepository } from "./repository";

interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {

  public static login = async (dto: LoginDTO) => {

    if (!dto.email || !dto.password) throw new ResponseError('Email y contraseña son requerdios', 400);

    const user = await AuthRepository.findByEmail(dto.email);

    if (!user) throw new ResponseError('Credenciales no válidas', 401);
    if (!user.isActive) throw new ResponseError('Usuario desactivado', 401);

    const passwordMatches = await Bun.password.verify(dto.password, user.password);

    if (!passwordMatches) throw new ResponseError('Credenciales no válidas', 401);

    const token = JWT.signToken({
      id: user.id,
      email: user.email,
      role: user.role.name,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role.name,
      }
    };
  }
}
