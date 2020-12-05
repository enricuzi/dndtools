const Utils = {
    random: value => {
        value = value || 1
        return Math.floor(Math.random() * value)
    },
    roll: value => {
        value = value || 20
        return Utils.random(value) + 1
    },
    getFeatureBonus: value => value ? Math.floor((value - 10) / 2) : null,
    isDevEnvironment: () => process.env.NODE_ENV === 'development',
    isProdEnvironment: () => process.env.NODE_ENV === 'production',
}

export default Utils