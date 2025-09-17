# HEX TO RGB

const [r, g, b] = "#05AB42".match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/).slice(1).map(e => parseInt(e, 16))

# RGB TO HEX

