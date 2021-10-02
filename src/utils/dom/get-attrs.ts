import { isTagElement } from '../types';

export function getAttrs(node: cheerio.Element): Record<string, string> {
  if (isTagElement(node)) {
    return node.attribs;
  }

  // TODO: This doesn't exist in the cheerio types. Can this occur?
  const attributes: Record<
    string | symbol,
    {
      name: string;
      value: string;
    }
  > = (node as any).attributes;

  if (attributes) {
    const attrs = Reflect.ownKeys(attributes).reduce(
      (acc, index) => {
        const attr = attributes[index];

        if (!attr.name || !attr.value) return acc;

        acc[attr.name] = attr.value;
        return acc;
      },
      {} as Record<string, string>
    );
    return attrs;
  }

  return {};
}
