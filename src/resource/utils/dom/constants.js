export const IS_LINK = new RegExp('https?://', 'i');
export const IS_IMAGE = new RegExp('.(png|gif|jpe?g)', 'i');

export const TAGS_TO_REMOVE = ['script', 'style', 'form'].join(',');
