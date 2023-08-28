export function getRoleName(role: string) {
  switch (role) {
  case "admin":
    return "Administrador";
  case "b1":
    return "B/1";
  case "b4":
    return "B/4";
  case "user":
    return "Usuário";
  default:
    return role;
  }
}
