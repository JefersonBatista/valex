export function invalidApiKeyError() {
  return {
    type: "unauthorized",
    message: "A chave de API informada é inválida",
  };
}

export function employeeNotFoundError() {
  return {
    type: "not_found",
    message: "O empregado não pertence à empresa identificada",
  };
}

export function employeeAlreadyHasCardOfTypeError() {
  return {
    type: "conflict",
    message: "O empregado já possui um cartão desse tipo",
  };
}

export function cardNumberAlreadyExistsError() {
  return {
    type: "conflict",
    message: "Já existe um cartão com esse número",
  };
}
