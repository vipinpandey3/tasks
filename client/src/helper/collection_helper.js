import lodash from "lodash";
import moment from "moment";
import isnumeric from "isnumeric";

import * as antd from "antd";
import * as uuidv4 from "uuid";
import string_template from "string-template";
import copy_clipboard from "copy-to-clipboard";

import constant_helper from "./constant_helper";

class CollectionHelper {
	// validators
	static validate_is_null_or_undefined(value) {
		return (lodash.isNull(value) === true || lodash.isUndefined(value) === true);
	}

	static validate_not_null_or_undefined(value) {
		return !CollectionHelper.validate_is_null_or_undefined(value);
	}

	static validate_is_number(value) {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;
		if (lodash.isNaN(value) || value == Infinity || value == -Infinity) return false;

		return isnumeric(value) === true;
	}

	static validate_not_number(value) {
		return !CollectionHelper.validate_is_number(value);
	}

	static validate_is_boolean(value) {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return lodash.isBoolean(value) === true;
	}

	static validate_not_boolean(value) {
		return !CollectionHelper.validate_is_boolean(value);
	}

	static validate_is_string(value) {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return lodash.isString(value) === true;
	}

	static validate_not_string(value) {
		return !CollectionHelper.validate_is_string(value);
	}

	static validate_is_array(value) {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return lodash.isArray(value) === true;
	}

	static validate_not_array(value) {
		return !CollectionHelper.validate_is_array(value);
	}

	static validate_is_object(value) {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return (lodash.isObject(value) === true && lodash.isArray(value) === false);
	}

	static validate_not_object(value) {
		return !CollectionHelper.validate_is_object(value);
	}

	static validate_is_function(value) {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return false;

		return lodash.isFunction(value);
	}

	static validate_not_function(value) {
		return !CollectionHelper.validate_is_function(value);
	}

	static validate_is_app(params) {
		if (CollectionHelper.validate_is_null_or_undefined(params)) return false;
		const app = params.app || null;
		if (CollectionHelper.validate_is_null_or_undefined(app)) return false;
		return true;
	}

	static show_message(title, type = "success", duration = 5) {
		antd.message[type](title, duration);
	}

	static show_message_with_description(message, type = "success", duration = 5, placement = "top", description = "Please wait for 5 minutes for the changes to reflect on your website") {
		antd.notification[type]({ message, duration, description, placement, top: 75 });
	}

	static show_notification(title, type = "success", message = "", duration = 5) {
		antd.notification[type]({ message: title, description: message, duration: duration });
	}

	static copy_to_clipboard(value = null) {
		if (!value) return;
		this.show_message("Copied");
		copy_clipboard(value);
	}

	static process_slugify(value) {
		const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
		const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
		const p = new RegExp(a.split("").join("|"), "g");

		return value
			.toString()
			.toLowerCase()
			.replace(/\s+/g, "-") // Replace spaces with -
			.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, "-and-") // Replace & with 'and'
			// eslint-disable-next-line no-useless-escape
			.replace(/[^\w\-]+/g, "") // Remove all non-word characters
			// eslint-disable-next-line no-useless-escape
			.replace(/\-\-+/g, "-") // Replace multiple - with single -
			.replace(/^-+/, "") // Trim - from start of text
			.replace(/-+$/, ""); // Trim - from end of text
	}

	// used to parse thye .env file value to required format
	static process_env_value(value) {
		if (value.startsWith("num_") === true) {
			return Number(value.replace("num_", "").trim());
		} else if (value.startsWith("bool_") === true) {
			return value.includes("true");
		} else if (value.startsWith("str_") === true) {
			return String(value.replace("str_", "").trim());
		} else {
			return value;
		}
	}


	static process_serialize_data(data) {
		// custom
		if (CollectionHelper.validate_is_string(data) === true) return data;

		let cache = [];
		const strigified = JSON.stringify(data, (key, value) => {
			if (typeof value === "object" && value !== null && cache.indexOf(value) !== -1) return;
			else if (typeof value === "object" && value !== null) cache.push(value);
			return value;
		});

		// garbage collector
		cache = null;
		return strigified;
	}

	static process_deserialize_data(data) {
		// custom
		if (CollectionHelper.validate_is_array(data) === true) return data;
		if (CollectionHelper.validate_is_object(data) === true) return data;

		return JSON.parse(data);
	}

	static process_key_join(value, separator = "_") {
		return value.join(separator);
	}

	// converts empty string to null
	static process_normalize_value(value) {
		return value === "" ? null : value;
	}

	static process_nullify(values, strict = false) {
		for (const key of Object.keys(values)) {
			if (values[key] === "" && strict === false) values[key] = null;
			else if (values[key] || values[key] === true || values[key] === false || CollectionHelper.get_lodash().isNumber(values[key])) {
			} else {
				delete values[key];
			}
		}
		return values;
	}

	static process_add_item(key, value) {
		if (CollectionHelper.validate_is_null_or_undefined(key) === true) return null;
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return null;

		// eslint-disable-next-line no-undef
		localStorage.setItem(key, value);
	}

	static process_delete_item(key) {
		if (CollectionHelper.validate_is_null_or_undefined(key) === true) return null;

		// eslint-disable-next-line no-undef
		localStorage.removeItem(key);
	}

	static process_get_item(key) {
		if (CollectionHelper.validate_is_null_or_undefined(key) === true) return null;

		// eslint-disable-next-line no-undef
		return localStorage.getItem(key);
	}

	static process_delete_items() {
		// eslint-disable-next-line no-undef
		localStorage.removeItem(constant_helper.get_app_constant().TODO_AUTHORIZATION);
	}

	static process_get_all_items() {
		let items = {};
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			let value = localStorage.getItem(key);
			items[key] = value;
		}
		return items;
	}

	// convertors
	static convert_to_isodatetime_utc_from_datetime(datetime) {
		if (CollectionHelper.validate_is_null_or_undefined(datetime) === true) return null;

		// custom
		if (moment(datetime).isValid() === false) return null;

		// get the offset
		if (moment(datetime).utcOffset() === 0) return moment.utc(datetime).toISOString();  // already in UTC, dont convert
		else return moment(datetime).utc().toISOString(); // not in UTC, convert
	}

	static convert_to_moment_utc_from_datetime(datetime) {
		if (CollectionHelper.validate_is_null_or_undefined(datetime) === true) return null;

		// custom
		if (moment(datetime).isValid() === false) return null;

		// safe convert to utc if not in utc
		const isodatetime_utc = CollectionHelper.convert_to_isodatetime_utc_from_datetime(datetime);
		return moment.utc(isodatetime_utc);
	}

	static convert_to_string_first_capital_from_any_string(value) {
		if (CollectionHelper.validate_is_null_or_undefined(value) === true) return null;

		return `${value[0].toUpperCase()}${value.substr(1)}`;
	}
	static convert_snake_to_camel_case(s) {
		if (CollectionHelper.validate_is_null_or_undefined(s) === true) return null;
		return s.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
			.replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
	}

	static get_first_letter_from_string(value) {
		if (CollectionHelper.validate_not_string(value) === true || value.length === 0) return null;

		return `${value[0].toUpperCase()}`;
	}

	static process_new_moment() {
		return moment.utc();
	}

	static process_new_uuid() {
		return uuidv4.v4();
	}

	static process_url_params(values) {
		let parts = values.trim().split("?");
		if (parts.length > 1) return new URLSearchParams(parts[1]);
		return new URLSearchParams("");
	}

	static process_objectify_params(values) {
		const params = [...CollectionHelper.process_url_params(values)];

		if (params.length > 0) {
			const sanitized_result = {};
			for (let i = 0; i < params.length; i++) {
				sanitized_result[params[i][0]] = params[i][1];
			}

			return sanitized_result;
		}

		return {};
	}

	static process_merge_appconfigs(appconfigs) {
		const appconfig = {};

		if (Array.isArray(appconfigs) === false) return appconfig;

		for (const currentappconfig of appconfigs) {
			if (CollectionHelper.validate_is_array(currentappconfig.value)) {
				appconfig[currentappconfig.name] = [
					...(currentappconfig.value || [])
				];
			} else {
				appconfig[currentappconfig.name] = {
					...(currentappconfig.value || {})
				};
			}
		}

		return appconfig;
	}

	static process_safe_url(link, params = {}) {
		try {
			const url = new URL(link);
			for (const key of Object.keys(params)) {
				if (CollectionHelper.validate_not_null_or_undefined(params[key])
					&& CollectionHelper.validate_is_string(params[key])
					&& params[key].length > 0) url.searchParams.append(key, params[key]);
			}

			return url.toString();
		} catch (error) {
			return "";
		}
	}

	static process_format_number(value) {
		if (CollectionHelper.validate_not_number(value)) return 0;
		return new Intl.NumberFormat("en-IN").format(value);
	}

	static get_string_templater() {
		return string_template;
	}

	static get_safe_appconfigvalue(map, key, default_value = null) {
		if (!key) return default_value;
		if (!map || !map[key]) return (constant_helper.get_app_constant().DEFAULT_APPCONFIG[key] || default_value);
		return map[key];
	}

	// getters
	static get_lodash() {
		return lodash;
	}

	static get_moment() {
		return moment;
	}

	static get_safe_amount(amount) {
		if (isNaN(amount)) return "-";
		return Number(amount);
	}

	static get_limited_text(text, length = 20, default_value = "", postfix = "...") {
		if (CollectionHelper.validate_is_null_or_undefined(text) === true) return default_value;
		if (text.length <= length) return text;
		return String(text).slice(0, length) + postfix;
	}

	static is_session_storage_supported() {
		try {
			if (window.sessionStorage) return true;
			return false;
		} catch (e) {
			return false;
		}
	}

	static is_local_storage_supported() {
		try {
			if (window.localStorage) return true;
			return false;
		} catch (e) {
			return false;
		}
	}
}

export default CollectionHelper;
