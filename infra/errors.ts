function InternalServerError(message?: string): Error {
    throw new Error(JSON.stringify({
        status_code: 500,
        hint: "internal_server_error",
        message: message || "Something happened on our servers. Please, report this issue.",
    }));
};

function UnauthorizedError(message?: string): Error {
    throw new Error(JSON.stringify({
        status_code: 401,
        hint: "unauthorized_error",
        message: message || "You dont have the permission to access this route.",
    }));
};

function ForbiddenError(message?: string): Error {
    throw new Error(JSON.stringify({
        status_code: 403,
        hint: "forbidden_error",
        message: message || "You not allowed to access this route since is protected.",
    }));
};

export default Object.freeze({
    InternalServerError,
    UnauthorizedError,
    ForbiddenError,
});