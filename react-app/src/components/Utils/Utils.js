export default class Utils {

	static getFeatureBonus(value) {
		return value ? Math.floor((value - 10) / 2) : null;
	}
}
