import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookies = (name, value, options) => {
	return cookies.set(name, value, {...options});
};

export const removeCookies = (name) => {
	return cookies.remove(name);
};

export const getCookies = (name) => {
	return cookies.get(name);
};
