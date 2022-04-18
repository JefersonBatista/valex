type ErrorType =
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "unprocessable_entity";

interface Error {
  type: ErrorType;
  message: string;
}

export function invalidApiKeyError(): Error {
  return {
    type: "unauthorized",
    message: "A chave de API informada é inválida",
  };
}

export function employeeNotFoundError(): Error {
  return {
    type: "not_found",
    message: "O empregado não pertence à empresa identificada",
  };
}

export function employeeAlreadyHasCardOfTypeError(): Error {
  return {
    type: "conflict",
    message: "O empregado já possui um cartão desse tipo",
  };
}

export function cardNumberAlreadyExistsError(): Error {
  return {
    type: "conflict",
    message: "Já existe um cartão com esse número",
  };
}

export function cardNotFoundError(): Error {
  return {
    type: "not_found",
    message: "Não existe cartão com esse ID",
  };
}

export function expiredCardError(): Error {
  return {
    type: "forbidden",
    message: "Esse cartão já expirou",
  };
}

export function cardAlreadyActiveError(): Error {
  return {
    type: "forbidden",
    message: "Essa cartão já está ativado",
  };
}

export function incorrectSecurityCodeError(): Error {
  return {
    type: "forbidden",
    message: "O código de segurança está incorreto",
  };
}

export function invalidCardPasswordError(): Error {
  return {
    type: "unprocessable_entity",
    message: "A senha do cartão deve ter exatamente 4 dígitos",
  };
}

export function incorrectCardPasswordError(): Error {
  return {
    type: "unauthorized",
    message: "Senha incorreta",
  };
}

export function businessNotFoundError(): Error {
  return {
    type: "not_found",
    message: "Não existe estabelecimento com esse ID",
  };
}

export function cardAndBusinessTypesDoNotMatchError(): Error {
  return {
    type: "forbidden",
    message: "Os tipos do cartão e do estabelecimento não conferem",
  };
}

export function insufficientFundsError(): Error {
  return {
    type: "forbidden",
    message: "O saldo do cartão é insuficiente para efetuar o pagamento",
  };
}

export function inactiveCardError(): Error {
  return { type: "forbidden", message: "O cartão ainda não foi ativado" };
}

export function cardIsBlockedError(): Error {
  return {
    type: "forbidden",
    message: "O cartão está bloqueado",
  };
}
