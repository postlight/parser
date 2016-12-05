const Detectors = {
  'meta[name="al:ios:app_name"][value="Medium"]': 'medium.com',
  'meta[name="generator"][value="blogger"]': 'blogspot.com',
};

export default function detectByHtml($) {
  const selector = Reflect.ownKeys(Detectors).find(s => $(s).length > 0);

  return Detectors[selector];
}
