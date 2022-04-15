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

export function cardNotFoundError() {
  return {
    type: "not_found",
    message: "Não existe cartão com esse ID",
  };
}

export function expiredCardError() {
  return {
    type: "forbidden",
    message: "Esse cartão já expirou",
  };
}

export function cardAlreadyActiveError() {
  return {
    type: "forbidden",
    message: "Essa cartão já está ativado",
  };
}

export function incorrectSecurityCodeError() {
  return {
    type: "forbidden",
    message: "O código de segurança está incorreto",
  };
}

export function invalidCardPasswordError() {
  return {
    type: "unprocessable_entity",
    message: "A senha do cartão deve ter exatamente 4 dígitos",
  };
}
