import Storage from "../Services/Storage";

const Utils = {
    random: value => {
        value = value || 1
        return Math.floor(Math.random() * value)
    },
    roll: value => {
        value = value || 20
        return Utils.random(value) + 1
    },
    getAttributeBonus: value => value ? Math.floor((value - 10) / 2) : null,
    isDevEnvironment: () => process.env.NODE_ENV === 'development',
    isProdEnvironment: () => process.env.NODE_ENV === 'production',
    delay: (time, callback) => setTimeout(callback, time),
    setCursor: function (target) {
        if (target.childNodes.length) {
            const range = document.createRange()
            const selection = window.getSelection()

            range.setStart(target.childNodes[0], target.innerText.length)
            range.collapse(true)

            selection.removeAllRanges()
            selection.addRange(range)

            target.focus()
        }
    },
    Component: {
        saveFilteredItem: (key, filter, data) => Storage.saveFilteredItem(key, filter, data)
    }
}

export default Utils