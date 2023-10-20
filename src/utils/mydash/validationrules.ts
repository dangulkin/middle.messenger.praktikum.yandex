export enum ValidationRules{
  name = '[A-ZА-Я][A-ZА-Яa-zа-я\s\\-]*(\s|$)',
	login = '([A-Za-z_0-9\\-]+){3,20}',
	email = '[A-Za-z0-9_\\-]+@[A-Za-z]+\.[A-Za-z]+',
	password = '(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9_]{8,40}',
	phone = '[+]?[0-9]{10,15}',
	message = '.+',
}
