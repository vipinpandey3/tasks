/* eslint-disable indent */
import collection_helper from "../../helper/collection_helper";
import constant_helper from "../../helper/constant_helper";

import axios_wrapper from "../../wrapper/axios_wrapper";
// import security_wrapper from "../../wrapper/security_wrapper";

export const dispatch_action = (type, attributes = null) => {
	if (collection_helper.validate_is_null_or_undefined(attributes) === true) return { type };
	else return { type, payload: attributes };
};

export const internal_generic_dispatch = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		if (collection_helper.validate_not_null_or_undefined(notify_callback) === true) notify_callback(opts);
		dispatch(dispatch_action(opts.event, opts.attributes || null));
	};
};

export const api_generic_post = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		const headers = {
			...constant_helper.get_app_constant().API_BASE_HEADER,
			...(opts.headers || {})
		};

		const base_url = process.env.REACT_APP_CLASSMENT_SERVER_IP;

		if (opts.has_authorization) headers.authorization = "Bearer " + getState().combine_reducer.app.header.authorization;
		// if (opts.has_signature) headers["x-signature"] = security_wrapper.get_wrapper().process_hmac_signature(collection_helper.process_serialize_data(opts.attributes), getState().app_reducer.header.shared_secret);
		if (opts.file) opts.attributes.file = opts.file;

		try {
			const result = await axios_wrapper.get_wrapper().process_axios_post(collection_helper.process_key_join([base_url, opts.endpoint], "/"), headers, opts.params, opts.attributes);
			// eslint-disable-next-line no-use-before-define
			api_base_dispatch(opts.event, false, dispatch, result, notify_callback);
		} catch (error) {
			// eslint-disable-next-line no-use-before-define
			api_base_error_dispatch(opts.event, false, dispatch, error, notify_callback);
		}
	};
};

export const api_generic_get = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		const headers = {
			...constant_helper.get_app_constant().API_BASE_HEADER,
			...(opts.headers || {})
		};

		const base_url = process.env.REACT_APP_CLASSMENT_SERVER_IP;

		if (opts.has_authorization) headers.authorization = "Bearer " + getState().combine_reducer.app.header.authorization;

		try {
			const result = await axios_wrapper.get_wrapper().process_axios_get(collection_helper.process_key_join([base_url, opts.endpoint], "/"), headers, opts.params);
			// eslint-disable-next-line no-use-before-define
			console.log("result", result)
			api_base_dispatch(opts.event, opts.append_data || false, dispatch, result, notify_callback);
		} catch (error) {
			// eslint-disable-next-line no-use-before-define
			api_base_error_dispatch(opts.event, opts.append_data || false, dispatch, error, notify_callback);
		}
	};
};

export const api_generic_put = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		const headers = {
			...constant_helper.get_app_constant().API_BASE_HEADER,
			...(opts.headers || {})
		};

		const base_url = process.env.REACT_APP_CLASSMENT_SERVER_IP;

		if (opts.has_authorization) headers.authorization = "Bearer " + getState().app_reducer.header.authorization;
		// if (opts.has_signature) headers["x-signature"] = security_wrapper.get_wrapper().process_hmac_signature(collection_helper.process_serialize_data(opts.attributes), getState().app_reducer.header.shared_secret);

		try {
			const result = await axios_wrapper.get_wrapper().process_axios_put(collection_helper.process_key_join([base_url, opts.endpoint], "/"), headers, opts.params, opts.attributes);
			// eslint-disable-next-line no-use-before-define
			api_base_dispatch(opts.event, false, dispatch, result, notify_callback);
		} catch (error) {
			// eslint-disable-next-line no-use-before-define
			api_base_error_dispatch(opts.event, false, dispatch, error, notify_callback);
		}
	};
};

export const api_generic_delete = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		const headers = {
			...constant_helper.get_app_constant().API_BASE_HEADER,
			...(opts.headers || {})
		};

		const base_url = process.env.REACT_APP_CLASSMENT_SERVER_IP;

		if (opts.has_authorization) headers.authorization = "Bearer " + getState().combine_reducer.app.header.authorization;

		try {
			const result = await axios_wrapper.get_wrapper().process_axios_delete(collection_helper.process_key_join([base_url, opts.endpoint], "/"), headers, opts.params);
			// eslint-disable-next-line no-use-before-define
			api_base_dispatch(opts.event, false, dispatch, result, notify_callback);
		} catch (error) {
			// eslint-disable-next-line no-use-before-define
			api_base_error_dispatch(opts.event, false, dispatch, error, notify_callback);
		}
	};
};

const api_base_dispatch = (event, append_data, dispatch, result, notify_callback) => {
	let status_codes = [200, 201, 202, 204];
	if (result.statusText !== "OK" || !status_codes.includes(result.status)) {
		// eslint-disable-next-line no-use-before-define
		api_base_error_dispatch(event, append_data || false, dispatch, result, notify_callback);
	} else {
		// eslint-disable-next-line no-use-before-define
		api_base_success_dispatch(event, append_data || false, dispatch, result, notify_callback);
	}
};

const api_base_success_dispatch = (event, append_data, dispatch, result, notify_callback) => {
	dispatch(dispatch_action(event, result.data));
	if (collection_helper.validate_not_null_or_undefined(notify_callback) === true) notify_callback(result);
};

const api_base_error_dispatch = (event, append_data, dispatch, result, notify_callback) => {
	const meta = (result && result.response && result.response.data && result.response.data.meta) || {};
	const data = (result && result.response && result.response.data && result.response.data.data) || {};
	const code = (result && result.response && result.response.data && result.response.data.meta && result.response.data.meta.code) || 400;

	if (code === 401 || code === 400 || code === 403) {
		collection_helper.process_delete_items();
		// dispatch(dispatch_action(constant_helper.get_app_constant().API_LOGOUT_DISPATCH, data));
	} else {
		dispatch(dispatch_action(constant_helper.get_app_constant().API_ERROR_DISPATCH, data));
	}

	if (collection_helper.validate_not_null_or_undefined(notify_callback) === true) notify_callback({ data: data, meta: meta });
};