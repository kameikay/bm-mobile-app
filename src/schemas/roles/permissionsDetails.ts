const permissionsDetails = (name: string) => {
  switch (name) {
  case "edit_users":
    return { name: "edit_users", description: "Editar usuários" };
  case "edit_roles":
    return { name: "edit_roles", description: "Editar cargos e permissões" };
  default:
    return {
      name: name,
      description: name.charAt(0).toUpperCase() + name.slice(1),
    };
  }
};

export default permissionsDetails;
