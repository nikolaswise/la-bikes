// Fake JQuery for returning arrays of dom nodes
export const $ = (selector, context = document) => Array(...context.querySelectorAll(selector))