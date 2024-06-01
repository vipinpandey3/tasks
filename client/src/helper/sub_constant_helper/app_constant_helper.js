export const TODO_AUTHORIZATION = "_cm_auth_token";
export const TODO_USER_FIRSTNAME = "user_firstname"
export const TODO_USER_LASTTNAME = "user_lastname"
export const TODO_USER_EMAIL = "user_email";
export const TODO_USER_ID = "user_id";
export const TODO_GENDER = "GENDER";

export const API_BASE_HEADER = {
	"accept": "application/json",
	"content-type": "application/json",
	"x-source": "web"
};

export const URL_REGEX = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;

export const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


// dispatchers

export const INTERNAL_DISPATCH = "INTERNAL_DISPATCH";

export const API_SUCCESS_DISPATCH = "API_SUCCESS_DISPATCH";
export const API_IGNORE_DISPATCH = "API_IGNORE_DISPATCH";
export const API_ERROR_DISPATCH = "API_ERROR_DISPATCH";

// DISPATCHS's
export const API_LOGIN_SUCCESS_DISPATCH = "API_LOGIN_SUCCESS_DISPATCH";
export const API_CREATE_TASKS = "API_CREATE_TASKS";
export const FETCH_TASKS_LIST = "FETCH_TASKS_LIST"

// URL'S
export const LOGIN_API_END_POINT = "login";

export const CREAT_TASK_END_POINT = "user/create-task";

