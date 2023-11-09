/* eslint-disable no-useless-escape */
export enum ValidationRules{
  name = '[A-ZА-Я][A-ZА-Яa-zа-я\s\\-]*(\s|$)',
	login = '([A-Za-z_0-9\\-]+){3,20}',
	email = '^\\S+@\\S+$',
	password = '(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9_]{8,40}',
	phone = '^.+$',
	message = '.+',
}
