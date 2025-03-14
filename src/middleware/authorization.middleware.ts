import { NextFunction, Request, Response } from "express";
import { AuthorizationService } from "../services/authorization.service";
import { TypeStudent } from "../types";
import { serverError } from "../util/response.helpers";

const authorizationService = new AuthorizationService();

export async function ValidateCreateAssessment(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // não utilizado
  try {
    const { authorization } = request.headers;

    const result = authorizationService.validateAuthorization(authorization!, [
      TypeStudent.Registered,
      TypeStudent.TechHelper,
    ]);

    if (!result.success) {
      return response.status(result.code).json(result);
    }

    next();
  } catch (error: any) {
    return serverError(response, error);
  }
}

export async function ValidateUpdateDeleteAssessment(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // não utilizado
  try {
    const { authorization } = request.headers;

    const result = authorizationService.validateAuthorization(authorization!, [
      TypeStudent.TechHelper,
    ]);

    if (!result.success) {
      return response.status(result.code).json(result);
    }

    next();
  } catch (error: any) {
    return serverError(response, error);
  }
}

export function ValidateAuthorizationPermition(permitedTypes: TypeStudent[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers;

      const result = authorizationService.validateAuthorization(
        authorization!,
        permitedTypes
      );

      if (!result.success) {
        return response.status(result.code).json(result);
      }
      next();
    } catch (error) {
      return serverError(response, error);
    }
  };
}
