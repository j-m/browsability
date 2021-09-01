import { readFile } from 'fs/promises'

function substringsWithOpenAndCloseTokens(content: string, open: string, close: string) {
  let index = 0
  const start = content.indexOf(open)
  const css = []
  while (start !== -1 && index < content.length) {
    const end = content.indexOf(close, start + open.length)
    if (end === -1) {
      throw new Error("No matching close token found")
    }
    const styleAttributeContent = content.substring(start + open.length, end)
    css.push(styleAttributeContent)
    index = end + close.length
  }
  return css
}

export const OPEN_STYLE_TAG = '<style>'
export const CLOSE_STYLE_TAG = '</style>'

export function getInternalCSS(htmlFileContent: string): string[] {
  return substringsWithOpenAndCloseTokens(htmlFileContent, OPEN_STYLE_TAG, CLOSE_STYLE_TAG)
}

export const STYLE_ATTRIBUTE = 'style'
const STYLE_ATTRIBUTE_OPEN = STYLE_ATTRIBUTE + "=\""

export function getInlineCSS(htmlFileContent: string): string[] {
  return substringsWithOpenAndCloseTokens(htmlFileContent, STYLE_ATTRIBUTE_OPEN, "\"")
}

export async function getCSSFromHTMLFile(fileName: string): Promise<string[]> {
  const fileContent = await readFile(fileName, 'utf8')
  const internal = getInternalCSS(fileContent)
  const inline = getInlineCSS(fileContent)
  return [...internal, ...inline]
}

export async function getCSSFromCSSFile(fileName: string): Promise<string[]> {
  const data = await readFile(fileName, 'utf8')
  return [data]
}

export async function getCSSFromFile(fileName: string): Promise<string[]> {
  const fileExtension = fileName.split('.').pop();
  switch (fileExtension) {
    case "html":
      return await getCSSFromHTMLFile(fileName)
    case "css":
      return await getCSSFromCSSFile(fileName)
    default:
      break
  }
  return []
}

export async function extractRawCSS(fileNames: string[]): Promise<string[]> {
  const aggregatedRawCSS: string[] = []
  await Promise.all(fileNames.map(async (fileName) => {
    const rawCSS = await getCSSFromFile(fileName)
    aggregatedRawCSS.push(...rawCSS)
  }))
  return aggregatedRawCSS
}
