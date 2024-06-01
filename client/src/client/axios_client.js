// system import
import axios from "axios";
import form_data from "form-data";
import querystring from "qs";

// app import
import collection_helper from "../helper/collection_helper";

import http_method_type_enum from "../enum/http_method_type";

class AxiosClient {
	constructor(notify_callback) {
		this.notify_callback_called = false;
		if (collection_helper.validate_is_function(notify_callback) === true) this.notify_callback = notify_callback;
	}

	init(key) {
		this.prepare_common_instance(key);
	}

	prepare_common_instance(key) {
		this.axios_instance = axios.create();
		this.key = key;

		if (collection_helper.validate_is_function(this.notify_callback) === true && this.notify_callback_called === false) {
			this.notify_callback_called = true;
			this.notify_callback(true);
		}
	}

	async process_axios_get(url, headers, params) {
		// attach default headers
		if (headers["content-type"] === "application/json") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/json" };
		} else if (headers["content-type"] === "application/x-www-form-urlencoded") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/x-www-form-urlencoded" };
		}

		if (headers.has_authorization) headers = { ...headers, "x-apikey": this.key, "x-source": "web" };
		if (collection_helper.validate_not_null_or_undefined(headers.has_authorization)) delete headers.has_authorization;

		if (headers.sha_algo) headers = { ...headers, "x-apikey": headers.sha_algo, "x-apikey-algo": "sha256", "x-source": "web" };
		if (collection_helper.validate_not_null_or_undefined(headers.sha_algo)) delete headers.sha_algo;

		const axiosopts = {
			method: http_method_type_enum.GET,
			url: url,
			headers: headers
		};

		if (collection_helper.validate_not_null_or_undefined(params) === true
			&& Object.keys(params).length > 0) {
			axiosopts.params = params;
		}

		const request_axios_result = await this.axios_instance.request(axiosopts);
		return request_axios_result;
	}

	async process_axios_put(url, headers, params, data) {
		// attach default headers
		if (headers["content-type"] === "application/json") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/json" };
		} else if (headers["content-type"] === "application/x-www-form-urlencoded") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/x-www-form-urlencoded" };
			data = querystring.stringify(data);
		}

		if (headers.has_authorization) headers = { ...headers, "x-apikey": this.key, "x-source": "web" };
		if (collection_helper.validate_not_null_or_undefined(headers.has_authorization)) delete headers.has_authorization;

		if (headers.sha_algo) headers = { ...headers, "x-apikey": headers.sha_algo, "x-apikey-algo": "sha256", "x-source": "web" };
		if (collection_helper.validate_not_null_or_undefined(headers.sha_algo)) delete headers.sha_algo;

		const axiosopts = {
			method: http_method_type_enum.PUT,
			url: url,
			headers: headers,
			data: data
		};

		if (collection_helper.validate_not_null_or_undefined(params) === true
			&& Object.keys(params).length > 0) {
			axiosopts.params = params;
		}

		const request_axios_result = await this.axios_instance.request(axiosopts);
		return request_axios_result;
	}

	async process_axios_delete(url, headers, params) {
		// attach default headers
		if (headers["content-type"] === "application/json") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/json" };
		} else if (headers["content-type"] === "application/x-www-form-urlencoded") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/x-www-form-urlencoded" };
		}

		if (headers.has_authorization) headers = { ...headers, "x-apikey": this.key, "x-source": "web" };
		if (collection_helper.validate_not_null_or_undefined(headers.has_authorization)) delete headers.has_authorization;

		if (headers.sha_algo) headers = { ...headers, "x-apikey": headers.sha_algo, "x-apikey-algo": "sha256", "x-source": "web" };
		if (collection_helper.validate_not_null_or_undefined(headers.sha_algo)) delete headers.sha_algo;

		const axiosopts = {
			method: http_method_type_enum.DELETE,
			url: url,
			headers: headers,
		};

		if (collection_helper.validate_not_null_or_undefined(params) === true
			&& Object.keys(params).length > 0) {
			axiosopts.params = params;
		}

		const request_axios_result = await this.axios_instance.request(axiosopts);
		return request_axios_result.data;
	}

	async process_axios_post(url, headers, params, data) {
		// attach default headers
		if (headers["content-type"] === "application/json") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/json" };
		} else if (headers["content-type"] === "application/x-www-form-urlencoded") {
			headers = { ...headers, "accept": "application/json", "content-type": "application/x-www-form-urlencoded" };
			data = querystring.stringify(data);
		} else if (headers["content-type"] === "multipart/form-data") {
			headers = { ...headers, "accept": "application/json", "content-type": "multipart/form-data" };
			const formdata = new form_data();
			Object.keys(data).map(key => formdata.append(key, data[key]));
			data = formdata;
		}

		if (headers.has_authorization) headers = { ...headers, "x-apikey": this.key, "x-source": "web" };
		if (collection_helper.validate_not_null_or_undefined(headers.has_authorization)) delete headers.has_authorization;

		if (headers.sha_algo) headers = { ...headers, "x-apikey": headers.sha_algo, "x-apikey-algo": "sha256", "x-source": "web" };
		if (collection_helper.validate_not_null_or_undefined(headers.sha_algo)) delete headers.sha_algo;

		const axiosopts = {
			method: http_method_type_enum.POST,
			url: url,
			headers: headers,
			data: data
		};

		if (collection_helper.validate_not_null_or_undefined(params) === true
			&& Object.keys(params).length > 0) {
			axiosopts.params = params;
		}

		const request_axios_result = await this.axios_instance.request(axiosopts);
		return request_axios_result;
	}
}

export default AxiosClient;